import { useAsyncEffect } from 'ahooks'
import FormData from 'form-data'
import { createReadStream, ReadStream, statSync } from 'fs-extra'
import { pickBy } from 'lodash-es'
import fetch, { Response, fileFrom } from 'node-fetch'
import { driveMultipartUploadUrl, safeMaxMultipartUploadSize } from '../constants/constants'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { getGoogleAuth } from '../helpers/getGoogleAuth'
import { DriveFile, DriveFileProperties } from '../helpers/getGoogleDrive'
import { UploadItem } from '../store/types'
import { useUpdateUploadItem } from './useUpdateUploadItem'

export function useHandleUploadItemUploading(uploadItem: UploadItem): void {
    const { update, setFailed } = useUpdateUploadItem(uploadItem)

    useAsyncEffect(async () => {
        if (uploadItem.statusName !== UploadStatusEnum.Uploading) return

        if (uploadItem.tempDownloadFilePath === undefined) {
            setFailed('Không tìm thấy tệp đã tải xuống')
            return
        }

        if (uploadItem.account === undefined) return

        if (uploadItem.destDir === undefined) return
        if (uploadItem.destDir.id == null) {
            setFailed('Thư mục đích không hợp lệ')
            return
        }

        const fileSize: number = statSync(uploadItem.tempDownloadFilePath).size

        update({
            fileSize,
            progress: 0,
            totalProgress: fileSize
        })

        const auth = getGoogleAuth(uploadItem.account)

        const accessToken: string | null | undefined = await auth.getAccessToken()
        if (accessToken == null) {
            setFailed('Không lấy được access token')
            return
        }

        const description: string = [
            `id: ${uploadItem.fileId}`,
            `userId: ${uploadItem.userId}`,
            `userName: ${uploadItem.userName}`,
            `pageUrl: ${uploadItem.pageUrl}`
        ].join('\n')

        const properties: Partial<DriveFileProperties> = pickBy<DriveFileProperties>({
            id: uploadItem.fileId,
            userId: uploadItem.userId,
            userName: uploadItem.userName,
            userUrl: uploadItem.userUrl,
            channelId: uploadItem.channelId,
            channelUrl: uploadItem.channelUrl,
            pageUrl: uploadItem.pageUrl
        })

        const fileData: DriveFile = {
            name: uploadItem.fileName,
            description,
            parents: [uploadItem.destDir.id],
            properties
        }
        const metadata: string = JSON.stringify(fileData)

        if (fileSize < safeMaxMultipartUploadSize) {
            const formData: FormData = new FormData()
            formData.append('metadata', metadata, {
                contentType: 'application/json'
            })

            const readStream: ReadStream = createReadStream(uploadItem.tempDownloadFilePath)
            formData.append('data', readStream, {
                filename: uploadItem.fileName
            })

            const uploadRes: Response = await fetch(driveMultipartUploadUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData
            })

            if (uploadRes.ok && uploadRes.status === 200) {
                const uploadedFile = (await uploadRes.json()) as DriveFile

                update({
                    statusName: UploadStatusEnum.Success,
                    uploadedFile
                })
            } else {
                setFailed(`Tải lên thất bại: ${uploadRes.status} - ${uploadRes.statusText}`)
            }
        }
    }, [uploadItem.statusName])
}

import FormData from 'form-data'
import { createReadStream, exists, ReadStream, stat } from 'fs-extra'
import fetch, { Response } from 'node-fetch'
import { createDir } from '../api/createDir'
import {
    driveMultipartUploadUrl,
    driveResumableUploadUrl,
    maxSafeMultipartUploadSize
} from '../constants/constants'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { updateUploadItem } from '../store/updateUploadItem'
import { getState } from '../store/useAppStore'
import { wait } from '../utils/wait'
import { getAccessToken } from './getAccessToken'
import { DriveFile, File, FileProperties } from './getGoogleDrive'
import { getUploadItemUpdater } from './getUploadItemUpdater'
import { isLocalPathUploadItem } from './isLocalPathUploadItem'
import { makeFile } from './makeFile'
import { makeFileDescription } from './makeFileDescription'
import { makeFileProperties } from './makeFileProperties'
import { UploadItem } from './makeUploadItem'

export async function handleUploadItemUploading(uploadItem: UploadItem): Promise<void> {
    const { setup, update, message, setFailed, next } = getUploadItemUpdater(uploadItem.id)

    setup(UploadStatusEnum.Uploading)

    const isUploadFromUrl: boolean = !isLocalPathUploadItem(uploadItem)

    if (uploadItem.destDir === undefined) return
    if (uploadItem.destDir.id == null) {
        setFailed('Thư mục đích không hợp lệ')
        return
    }

    if (!uploadItem.fileName) {
        setFailed('Chưa có tên tệp')
        return
    }

    if (uploadItem.localDirPath !== undefined) {
        const stillDirExists: boolean = await exists(uploadItem.localDirPath)
        if (!stillDirExists) {
            setFailed('Thư mục cần tải lên không tồn tại')
            return
        }

        try {
            const uploadedFile: File = await createDir(uploadItem.destDir, uploadItem.fileName)

            if (uploadItem.subItemIds.length > 0) {
                updateUploadItem(uploadItem.subItemIds, {
                    destDir: uploadedFile,
                    isReady: true
                })
            }
            update({ uploadedFile })
        } catch (error) {
            setFailed(error)
            return
        }

        next()
        return
    }

    let uploadFilePath: string | undefined = isUploadFromUrl
        ? uploadItem.tempDownloadFilePath
        : uploadItem.localFilePath
    if (uploadFilePath === undefined) {
        setFailed('Không có đường dẫn tệp cần tải lên')
        return
    }

    const stillUploadFileExists: boolean = await exists(uploadFilePath)
    if (!stillUploadFileExists) {
        setFailed('Tệp cần tải lên không tồn tại')
        return
    }

    let fileSize: number = (await stat(uploadFilePath)).size
    update({ fileSize, totalProgress: fileSize })

    const accessToken: string | undefined = await getAccessToken(uploadItem.destDir.account)
    if (accessToken === undefined) {
        setFailed('Không lấy được access token')
        return
    }

    let description: string | undefined = undefined
    let properties: Partial<FileProperties> | undefined = undefined

    if (isUploadFromUrl) {
        description = makeFileDescription(uploadItem)
        properties = makeFileProperties(uploadItem)
    }

    const fileData: DriveFile = {
        name: uploadItem.fileName,
        parents: [uploadItem.destDir.id],
        description,
        properties
    }
    const metadata: string = JSON.stringify(fileData)

    const isMultipartUpload: boolean = fileSize < maxSafeMultipartUploadSize
    let uploadRes: Response | undefined = undefined

    if (isMultipartUpload) {
        const formData: FormData = new FormData()
        formData.append('metadata', metadata, {
            contentType: 'application/json'
        })

        const readStream: ReadStream = createReadStream(uploadFilePath)
        formData.append('data', readStream, {
            filename: uploadItem.fileName
        })

        uploadRes = await fetch(driveMultipartUploadUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        })
    } else {
        let resumableUrl: string | undefined = undefined

        for (let n = 1; n <= 5; n++) {
            try {
                const res: Response = await fetch(driveResumableUploadUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: metadata
                })
                resumableUrl = res.headers.get('Location') || undefined
            } finally {
                if (resumableUrl !== undefined) break

                message(`Không lấy được URL tải lên, đang thử lại lần ${n}`)
                await wait(5000)
            }
        }
        if (resumableUrl === undefined) {
            setFailed('Không lấy được URL tải lên')
            return
        }

        let start: number = 0
        const uploadChunkSize: number = getState().uploadChunkSize

        for (let n = 1; n <= 5; ) {
            const end: number = Math.min(start + uploadChunkSize, fileSize) - 1
            const len: number = end - start + 1

            const subReadStream: ReadStream = createReadStream(uploadFilePath, { start, end })

            try {
                const res: Response = await fetch(resumableUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Length': String(len),
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`
                    },
                    body: subReadStream
                })
                if (res.status === 200) {
                    uploadRes = res
                    break
                } else if (res.status === 308) {
                    const range: string | null = res.headers.get('Range')
                    if (range === null) throw null

                    const rangeEnd: string | undefined = range.split('-').at(-1)
                    if (rangeEnd === undefined) throw null

                    start = 1 + Number(rangeEnd)
                    update({ progress: start })
                } else {
                    throw null
                }
            } catch (error) {
                if (n === 5) {
                    setFailed('Lỗi khi đang tải lên')
                    return
                }
                message(`Lỗi khi tải lên, đang thử lại lần ${n}`)
                await wait(5000)
                n++
            }
        }
    }

    if (uploadRes !== undefined && uploadRes.ok && uploadRes.status === 200) {
        const uploadedDriveFile: File = (await uploadRes.json()) as File
        const uploadedFile: File = makeFile(uploadedDriveFile, uploadItem.destDir.account)

        update({ uploadedFile })
        next()
    } else {
        setFailed('Tải lên thất bại')
        return
    }
}

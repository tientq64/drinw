import { useAsyncEffect } from 'ahooks'
import { maxBy } from 'lodash-es'
import { Format, Payload, youtubeDl } from 'youtube-dl-exec'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'
import { useUpdateUploadItem } from './useUpdateUploadItem'

const removeTiktokTagInTitleRegex: RegExp =
    /#[\p{L}\d\-_\p{Emoji}\p{EComp}\p{EMod}\p{EBase}\p{EPres}]+/gu

export function useHandleUploadItemPreload(uploadItem: UploadItem): void {
    const { update, setFailed } = useUpdateUploadItem(uploadItem)

    useAsyncEffect(async () => {
        if (uploadItem.statusName !== UploadStatusEnum.Preload) return

        if (uploadItem.pageUrl !== undefined) {
            let data: Payload | string
            try {
                data = await youtubeDl(uploadItem.pageUrl, {
                    dumpSingleJson: true,
                    format: 'bv*+ba/b'
                })
            } catch (error) {
                setFailed('Không lấy được thông tin tệp từ URL')
                throw error
            }
            if (typeof data === 'string') return

            const title: string = data.title
                .replace(removeTiktokTagInTitleRegex, '')
                .replace(/ {2,}/g, '')
                .trim()
            const fileName: string = `${title} [${data.id}].${data.ext}`.trim()

            let estimatedSize: number | undefined = (data as any).filesize
            if (estimatedSize === undefined) {
                const largestSizeFormat: Format | undefined = maxBy(data.formats, 'filesize')
                if (largestSizeFormat?.filesize != null) {
                    estimatedSize = largestSizeFormat.filesize
                }
            }

            const tempDownloadFilePath: string = `temp/${uploadItem.id}.${data.ext}`

            update({
                fileName,
                estimatedSize,
                tempDownloadFilePath,
                fileId: data.id,
                userId: data.uploader_id,
                userName: data.uploader,
                userUrl: data.uploader_url,
                channelId: data.channel_id,
                channelUrl: data.channel_url,
                pageUrl: data.webpage_url || uploadItem.pageUrl
            })
        }

        update({ statusName: UploadStatusEnum.Waiting })
    }, [uploadItem.statusName])
}

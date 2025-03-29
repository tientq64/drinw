import { maxBy } from 'lodash-es'
import { Format, Payload, youtubeDl } from 'youtube-dl-exec'
import { youtubeDlDownloadFormat } from '../constants/constants'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from './makeUploadItem'
import { getUploadItemUpdater } from './getUploadItemUpdater'

const removeTiktokTagInTitleRegex: RegExp =
    /#[\p{L}\d\-_\p{Emoji}\p{EComp}\p{EMod}\p{EBase}\p{EPres}]+/gu

export async function handleUploadItemPreload(uploadItem: UploadItem): Promise<void> {
    const { update, setFailed, next } = getUploadItemUpdater(uploadItem)

    update({
        statusName: UploadStatusEnum.Preload
    })

    let pageUrl: string | undefined = uploadItem.pageUrl

    if (pageUrl !== undefined) {
        let data: Payload | string
        try {
            data = await youtubeDl(pageUrl, {
                format: youtubeDlDownloadFormat,
                dumpSingleJson: true
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

        let userUrl: string | undefined = data.uploader_url
        if (userUrl) {
            userUrl = userUrl.replace(/@[a-z0-9_.]+/, `@${data.uploader_id}`)
        }

        if (data.webpage_url) {
            pageUrl = data.webpage_url
        }
        if (data.webpage_url_domain === 'tiktok.com') {
            pageUrl = pageUrl.replace(/@[a-z0-9_.]+/, '@')
        }

        update({
            fileName,
            estimatedSize,
            tempDownloadFilePath,
            fileId: data.id,
            userId: data.uploader_id,
            userName: data.uploader,
            userUrl,
            channelId: data.channel_id,
            channelUrl: data.channel_url,
            pageUrl
        })
    }

    next()
}

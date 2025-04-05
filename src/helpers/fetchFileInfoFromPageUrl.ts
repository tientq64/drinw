import to from 'await-to-js'
import youtubeDl from 'youtube-dl-exec'
import { youtubeDlDownloadFormat } from '../constants/constants'
import { FileInfo, FileInfoKey } from './fetchFileInfo'

const tiktokUsernameInUrlRegex: RegExp = /@[a-z0-9_.]+/

export async function fetchFileInfoFromPageUrl(pageUrl: string): Promise<FileInfo> {
    const [error, data] = await to<FileInfo | string>(
        youtubeDl(pageUrl, {
            format: youtubeDlDownloadFormat,
            dumpSingleJson: true
        })
    )
    if (error) {
        console.error(error)
        throw Error('Không lấy được thông tin tệp từ URL')
    }
    if (typeof data === 'string') {
        throw Error('Thông tin tệp trả về không hợp lệ')
    }

    for (const key in data) {
        if (data[key as FileInfoKey] === null) {
            data[key as FileInfoKey] = undefined
        }
    }

    let domain: string | undefined = data.webpage_url_domain
    if (domain !== undefined) {
        domain = domain.replace(/^www\./, '')
        data.webpage_url_domain = domain
    }

    let uploaderUrl: string | undefined = data.uploader_url
    if (uploaderUrl !== undefined) {
        uploaderUrl = uploaderUrl.replace(tiktokUsernameInUrlRegex, `@${data.uploader_id}`)
        data.uploader_url = uploaderUrl
    }

    let webpageUrl: string | undefined = data.webpage_url
    if (webpageUrl !== undefined) {
        if (domain === 'tiktok.com') {
            webpageUrl = webpageUrl.replace(tiktokUsernameInUrlRegex, '@')
        }
        data.webpage_url = webpageUrl
    }

    return data
}

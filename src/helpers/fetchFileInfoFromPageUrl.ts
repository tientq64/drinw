import to from 'await-to-js'
import youtubeDl from 'youtube-dl-exec'
import { youtubeDlDownloadFormat } from '../constants/constants'
import { FileInfo } from './fetchFileInfo'

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

    return data
}

import to from 'await-to-js'
import { Dirent, readdir } from 'fs-extra'
import { maxBy } from 'lodash-es'
import { join } from 'path'
import { Format } from 'youtube-dl-exec'
import { findAccountKindByDomain } from '../constants/accountKinds'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { updateUploadItem } from '../store/updateUploadItem'
import { formatPath } from '../utils/formatPath'
import { addLocalDirToQueue } from './addLocalDirToQueue'
import { addLocalFileToQueue } from './addLocalFileToQueue'
import { fetchFileInfo, FileInfo } from './fetchFileInfo'
import { getUploadItemUpdater } from './getUploadItemUpdater'
import { UploadItem } from './makeUploadItem'

const removeTiktokTagInTitleRegex: RegExp =
    /#[\p{L}\d\-_\p{Emoji}\p{EComp}\p{EMod}\p{EBase}\p{EPres}]+/gu

export async function handleUploadItemPreload(uploadItem: UploadItem): Promise<void> {
    const { setup, update, message, setFailed, next } = getUploadItemUpdater(uploadItem.id)

    setup(UploadStatusEnum.Preload)

    let pageUrl: string | undefined = uploadItem.pageUrl

    if (pageUrl !== undefined || uploadItem.sourceCode !== undefined) {
        const [error, data] = await to<FileInfo>(fetchFileInfo(pageUrl, uploadItem.sourceCode))
        if (error) {
            setFailed(error)
            throw error
        }
        if (data.ext === undefined) {
            setFailed('Phần mở rộng tệp không xác định')
            return
        }

        let title: string = data.title ?? ''
        if (title !== '') {
            title = title.replace(removeTiktokTagInTitleRegex, '').replace(/ {2,}/g, '').trim()
        }
        if (title === data.id) {
            title = ''
        }
        const fileName: string = `${title} [${data.id}].${data.ext}`.trim()

        let estimatedSize: number | undefined = data.filesize ?? data.estimatedSize
        if (estimatedSize === undefined) {
            const largestSizeFormat: Format | undefined = maxBy(data.formats, 'filesize')
            if (largestSizeFormat?.filesize != null) {
                estimatedSize = largestSizeFormat.filesize
            }
        }

        const tempDownloadFilePath: string = `temp/${uploadItem.id}.${data.ext}`

        let kindName: string | undefined = uploadItem.kindName
        if (kindName === undefined && data.webpage_url_domain !== undefined) {
            kindName = findAccountKindByDomain(data.webpage_url_domain)?.domain
        }

        const userUrl: string | undefined = data.uploader_url

        if (data.webpage_url !== undefined) {
            pageUrl = data.webpage_url
        }

        update({
            fileName,
            estimatedSize,
            tempDownloadFilePath,
            kindName,
            fileId: data.id,
            userId: data.uploader_id,
            userName: data.uploader,
            userUrl,
            channelId: data.channel_id,
            channelUrl: data.channel_url,
            pageUrl
        })
    } //
    else if (uploadItem.localDirPath !== undefined) {
        if (!uploadItem.isSubItem) {
            message('Đang đọc thư mục')

            const allSubItemIds: string[] = []
            let progress: number = 0

            const readDir = async (dirItem: UploadItem): Promise<void> => {
                const dirPath: string | undefined = dirItem.localDirPath
                if (dirPath === undefined) return

                const dirents: Dirent[] = await readdir(dirPath, {
                    encoding: 'utf8',
                    withFileTypes: true
                })
                if (dirents.length === 0) return

                const subItemIds: string[] = []

                for (const dirent of dirents) {
                    const subPath: string = formatPath(join(dirPath, dirent.name))

                    if (dirent.isDirectory()) {
                        const subItem: UploadItem = addLocalDirToQueue({
                            localDirPath: subPath,
                            isSubItem: true,
                            isReady: false
                        })

                        subItemIds.push(subItem.id)
                        allSubItemIds.push(subItem.id)

                        progress += 1
                        update({ progress })

                        await readDir(subItem)
                    } //
                    else if (dirent.isFile()) {
                        const subItem: UploadItem = addLocalFileToQueue({
                            localFilePath: subPath,
                            isSubItem: true,
                            isReady: false
                        })

                        subItemIds.push(subItem.id)
                        allSubItemIds.push(subItem.id)

                        progress += 1
                        update({ progress })
                    }
                }
                updateUploadItem(dirItem.id, { subItemIds })
            }
            await readDir(uploadItem)

            update({ allSubItemIds })
        }
    }

    next()
}

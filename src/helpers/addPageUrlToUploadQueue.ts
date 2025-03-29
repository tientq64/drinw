import { addUploadItem } from '../store/addUploadItem'
import { File } from './getGoogleDrive'
import { makeUploadItem, UploadItem } from './makeUploadItem'

interface Options {
    pageUrl: string
    isSmartUpload: boolean
    destDir?: File
}

export function addPageUrlToUploadQueue({ pageUrl, isSmartUpload, destDir }: Options): UploadItem {
    const uploadItem: UploadItem = makeUploadItem({
        isSmartUpload,
        pageUrl,
        destDir
    })
    addUploadItem(uploadItem)

    return uploadItem
}

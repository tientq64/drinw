import { addUploadItem } from '../store/addUploadItem'
import { File } from './getGoogleDrive'
import { makeUploadItem, UploadItem } from './makeUploadItem'

interface Options {
    localFilePath: string
    destDir?: File
    isSubItem?: boolean
    isReady?: boolean
}

export function addLocalFileToQueue({
    localFilePath,
    destDir,
    isSubItem = false,
    isReady = true
}: Options): UploadItem {
    const uploadItem: UploadItem = makeUploadItem({
        localFilePath,
        destDir,
        isSubItem,
        isReady
    })
    addUploadItem(uploadItem)

    return uploadItem
}

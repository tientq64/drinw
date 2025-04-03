import { addUploadItem } from '../store/addUploadItem'
import { File } from './getGoogleDrive'
import { makeUploadItem, UploadItem } from './makeUploadItem'

interface Options {
    localDirPath: string
    destDir?: File
    isSubItem?: boolean
    isReady?: boolean
}

export function addLocalDirToQueue({
    localDirPath,
    destDir,
    isSubItem = false,
    isReady = true
}: Options): UploadItem {
    const uploadItem: UploadItem = makeUploadItem({
        localDirPath,
        destDir,
        isSubItem,
        isReady
    })
    addUploadItem(uploadItem)

    return uploadItem
}

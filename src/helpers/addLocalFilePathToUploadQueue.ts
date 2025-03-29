import { addUploadItem } from '../store/addUploadItem'
import { File } from './getGoogleDrive'
import { makeUploadItem, UploadItem } from './makeUploadItem'

interface Options {
    localFilePath: string
    destDir: File
}

export function addLocalFilePathToUploadQueue({ localFilePath, destDir }: Options): UploadItem {
    const uploadItem: UploadItem = makeUploadItem({
        localFilePath,
        destDir
    })
    addUploadItem(uploadItem)

    return uploadItem
}

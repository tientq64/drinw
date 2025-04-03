import { addUploadItem } from '../store/addUploadItem'
import { File } from './getGoogleDrive'
import { makeUploadItem, UploadItem } from './makeUploadItem'

interface Options {
    sourceCode: string
    destDir?: File
}

export function addSourceCodeToQueue({ sourceCode, destDir }: Options): UploadItem {
    const uploadItem: UploadItem = makeUploadItem({
        sourceCode,
        destDir
    })
    addUploadItem(uploadItem)

    return uploadItem
}

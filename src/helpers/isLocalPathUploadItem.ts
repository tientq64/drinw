import { UploadItem } from './makeUploadItem'

export function isLocalPathUploadItem(uploadItem: UploadItem): boolean {
    return uploadItem.localFilePath !== undefined || uploadItem.localDirPath !== undefined
}

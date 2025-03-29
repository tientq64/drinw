import { UploadStatusEnum } from '../constants/uploadStatuses'
import { addCurrentFile } from '../store/addCurrentFile'
import { UploadItem } from './makeUploadItem'
import { File } from './getGoogleDrive'
import { getUploadItemUpdater } from './getUploadItemUpdater'

export function handleUploadItemSuccess(uploadItem: UploadItem): void {
    const { update } = getUploadItemUpdater(uploadItem)

    update({
        statusName: UploadStatusEnum.Success,
        progress: uploadItem.totalProgress
    })

    const uploadedFile: File | undefined = uploadItem.uploadedFile
    if (uploadedFile === undefined) return

    addCurrentFile(uploadedFile)
}

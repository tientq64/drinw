import { unlink } from 'fs-extra'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { addCurrentFile } from '../store/addCurrentFile'
import { File } from './getGoogleDrive'
import { getUploadItemUpdater } from './getUploadItemUpdater'
import { UploadItem } from './makeUploadItem'
import { tryStartUploadFromQueue } from './tryStartUploadFromQueue'

export function handleUploadItemSuccess(uploadItem: UploadItem): void {
    const { setup, update } = getUploadItemUpdater(uploadItem.id)

    setup(UploadStatusEnum.Success)

    update({ progress: uploadItem.totalProgress })

    const uploadedFile: File | undefined = uploadItem.uploadedFile
    if (uploadedFile === undefined) return

    addCurrentFile(uploadedFile)

    if (uploadItem.tempDownloadFilePath) {
        unlink(uploadItem.tempDownloadFilePath)
    }

    tryStartUploadFromQueue()
}

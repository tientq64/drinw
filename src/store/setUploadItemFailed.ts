import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from './types'
import { updateUploadItem } from './updateUploadItem'

export function setUploadItemFailed(uploadItem: UploadItem, failureReason: unknown): void {
    const message: string = String(failureReason)

    updateUploadItem(uploadItem, {
        statusName: UploadStatusEnum.Failed,
        message
    })
}

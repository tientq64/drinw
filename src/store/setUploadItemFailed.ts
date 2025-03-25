import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from './types'
import { updateUploadItem } from './updateUploadItem'

export function setUploadItemFailed(uploadItem: UploadItem, failureReasonData: unknown): void {
    const failureReason: string = String(failureReasonData)

    updateUploadItem(uploadItem, {
        statusName: UploadStatusEnum.Failed,
        failureReason
    })
}

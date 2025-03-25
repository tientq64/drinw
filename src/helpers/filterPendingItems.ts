import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'

export function filterPendingItems(uploadItems: UploadItem[]): UploadItem[] {
    return uploadItems.filter((uploadItem) => {
        return (
            uploadItem.statusName === UploadStatusEnum.Idle ||
            uploadItem.statusName === UploadStatusEnum.Waiting
        )
    })
}

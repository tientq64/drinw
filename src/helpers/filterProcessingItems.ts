import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'

export function filterProcessingItems(uploadItems: UploadItem[]): UploadItem[] {
    return uploadItems.filter((uploadItem) => {
        return (
            uploadItem.statusName === UploadStatusEnum.Preload ||
            uploadItem.statusName === UploadStatusEnum.Downloading ||
            uploadItem.statusName === UploadStatusEnum.Uploading
        )
    })
}

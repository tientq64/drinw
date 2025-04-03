import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from './makeUploadItem'

export function filterProcessingItems(uploadItems: UploadItem[]): UploadItem[] {
    return uploadItems.filter((item) => {
        return (
            item.statusName === UploadStatusEnum.Preload ||
            item.statusName === UploadStatusEnum.Downloading ||
            item.statusName === UploadStatusEnum.Uploading
        )
    })
}

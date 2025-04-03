import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from './makeUploadItem'

export function checkIsFinishedItem(uploadItem: UploadItem): boolean {
    return (
        uploadItem.statusName === UploadStatusEnum.Success ||
        uploadItem.statusName === UploadStatusEnum.Failed
    )
}

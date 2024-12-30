import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'

export function checkIsWaitingItem(uploadItem: UploadItem): boolean {
	return (
		uploadItem.status === UploadStatusEnum.Pending ||
		uploadItem.status === UploadStatusEnum.FetchedMetadata
	)
}

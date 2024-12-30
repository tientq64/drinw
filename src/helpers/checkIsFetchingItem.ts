import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'

export function checkIsFetchingItem(uploadItem: UploadItem): boolean {
	return (
		uploadItem.status === UploadStatusEnum.Downloading ||
		uploadItem.status === UploadStatusEnum.Uploading
	)
}

import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'

export function checkIsProcessingItem(uploadItem: UploadItem): boolean {
	return (
		uploadItem.status === UploadStatusEnum.FetchingMetadata ||
		uploadItem.status === UploadStatusEnum.FetchedMetadata ||
		uploadItem.status === UploadStatusEnum.Downloading ||
		uploadItem.status === UploadStatusEnum.Uploading
	)
}

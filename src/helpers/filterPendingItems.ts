import { filter } from 'lodash-es'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'

export function filterPendingItems(uploadItems: UploadItem[]): UploadItem[] {
	const pendingItems = filter(uploadItems, {
		status: UploadStatusEnum.Pending
	})
	return pendingItems
}

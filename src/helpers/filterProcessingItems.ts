import { filter } from 'lodash-es'
import { UploadItem } from '../store/types'
import { checkIsProcessingItem } from './checkIsProcessingItem'

export function filterProcessingItems(uploadItems: UploadItem[]): UploadItem[] {
	const uploadingItems: UploadItem[] = filter(uploadItems, checkIsProcessingItem)
	return uploadingItems
}

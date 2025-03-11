import { filter } from 'lodash-es'
import { UploadItem } from '../store/types'
import { checkIsProcessingItem } from './checkIsProcessingItem'

export function filterProcessingItems(uploadItems: UploadItem[]): UploadItem[] {
	return filter(uploadItems, checkIsProcessingItem)
}

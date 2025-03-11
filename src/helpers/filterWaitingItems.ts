import { filter } from 'lodash-es'
import { UploadItem } from '../store/types'
import { checkIsWaitingItem } from './checkIsWaitingItem'

export function filterWaitingItems(uploadItems: UploadItem[]): UploadItem[] {
	return filter(uploadItems, checkIsWaitingItem)
}

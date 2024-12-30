import { filter } from 'lodash-es'
import { UploadItem } from '../store/types'
import { checkIsWaitingItem } from './checkIsWaitingItem'

export function filterWaitingItems(uploadItems: UploadItem[]): UploadItem[] {
	const waitingItems: UploadItem[] = filter(uploadItems, checkIsWaitingItem)
	return waitingItems
}

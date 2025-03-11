import { filter } from 'lodash-es'
import { UploadItem } from '../store/types'
import { checkIsFetchingItem } from './checkIsFetchingItem'

export function filterFetchingItems(uploadItems: UploadItem[]): UploadItem[] {
	return filter(uploadItems, checkIsFetchingItem)
}

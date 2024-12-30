import { filter } from 'lodash-es'
import { UploadItem } from '../store/types'
import { checkIsFetchingItem } from './checkIsFetchingItem'

export function filterFetchingItems(uploadItems: UploadItem[]): UploadItem[] {
	const fetchingItems: UploadItem[] = filter(uploadItems, checkIsFetchingItem)
	return fetchingItems
}

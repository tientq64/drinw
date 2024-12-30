import { find } from 'lodash-es'
import { UploadItem } from './types'
import { setState } from './useAppStore'
import { WritableDraft } from 'immer'

export function updateUploadItem(
	id: string,
	partial: Partial<UploadItem> | ((draft: WritableDraft<UploadItem>) => void)
): void {
	setState((state) => {
		const uploadItem = find(state.uploadItems, { id })
		if (uploadItem === undefined) return

		if (typeof partial === 'function') {
			partial(uploadItem)
		} else {
			Object.assign(uploadItem, partial)
		}
	})
}

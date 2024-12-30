import { tryStartPendingItems } from '../helpers/tryStartPendingItems'
import { UploadItem } from './types'
import { setState } from './useAppStore'

export function pushUploadItems(...uploadItems: UploadItem[]): void {
	setState((state) => {
		state.uploadItems.push(...uploadItems)
	})
}

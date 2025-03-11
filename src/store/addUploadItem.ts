import { UploadItem } from './types'
import { setState } from './useAppStore'

export function addUploadItem(...uploadItems: UploadItem[]): void {
	setState((state) => {
		state.uploadItems.push(...uploadItems)
	})
}

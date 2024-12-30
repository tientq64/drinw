import { find } from 'lodash-es'
import { setState } from './useAppStore'
import { UploadStatusEnum } from '../constants/uploadStatuses'

export function setUploadItemFailed(id: string, anyReason: string | Error | unknown): void {
	setState((state) => {
		const uploadItem = find(state.uploadItems, { id })
		if (uploadItem === undefined) return

		const reason: string = String(anyReason)

		uploadItem.status = UploadStatusEnum.Failed
		uploadItem.failedReason = reason
	})
}

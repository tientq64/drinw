import { castDraft } from 'immer'
import { sumBy } from 'lodash-es'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { setState } from '../store/useAppStore'
import { filterFetchingItems } from './filterFetchingItems'
import { filterProcessingItems } from './filterProcessingItems'
import { filterWaitingItems } from './filterWaitingItems'

export function tryStartPendingItems(): void {
	setState((state) => {
		const maxUploadingSize: number = state.maxUploadingSize
		const maxUploadingParallel: number = state.maxUploadingParallel

		const processingItems = castDraft(filterProcessingItems(state.uploadItems))
		let processingCount: number = processingItems.length

		const fetchingItems = castDraft(filterFetchingItems(state.uploadItems))
		let fetchingSize: number = sumBy(fetchingItems, (uploadItem) => uploadItem.fileSize ?? 0)

		const waitingItems = castDraft(filterWaitingItems(state.uploadItems))

		for (const waitingItem of waitingItems) {
			if (processingCount >= maxUploadingParallel) return

			switch (waitingItem.status) {
				case UploadStatusEnum.Pending:
					waitingItem.status = UploadStatusEnum.FetchingMetadata
					processingCount++
					break

				case UploadStatusEnum.FetchedMetadata:
					if (waitingItem.fileSize === undefined) {
						waitingItem.status = UploadStatusEnum.Failed
					} else {
						fetchingSize += waitingItem.fileSize
						if (fetchingSize > maxUploadingSize) return
						waitingItem.status = UploadStatusEnum.Downloading
						processingCount++
					}
					break
			}
		}
	})
}

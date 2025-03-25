import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'
import { updateUploadItem } from '../store/updateUploadItem'
import { getState } from '../store/useAppStore'
import { filterPendingItems } from './filterPendingItems'

export function tryStartUploadFromQueue(): void {
    const uploadItems: UploadItem[] = getState().uploadItems

    const pendingItems: UploadItem[] = filterPendingItems(uploadItems)
    if (pendingItems.length === 0) return

    for (const pendingItem of pendingItems) {
        if (pendingItem.statusName === UploadStatusEnum.Idle) {
            updateUploadItem(pendingItem, { statusName: UploadStatusEnum.Preload })
        } else {
            updateUploadItem(pendingItem, { statusName: UploadStatusEnum.Downloading })
        }
    }
}

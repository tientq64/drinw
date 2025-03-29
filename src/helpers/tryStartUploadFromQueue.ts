import { UploadItem } from './makeUploadItem'
import { getState } from '../store/useAppStore'
import { filterPendingItems } from './filterPendingItems'
import { nextUploadItemStatus } from './nextUploadItemStatus'

export function tryStartUploadFromQueue(): void {
    const uploadItems: UploadItem[] = getState().uploadItems

    const pendingItems: UploadItem[] = filterPendingItems(uploadItems)
    if (pendingItems.length === 0) return

    for (const pendingItem of pendingItems) {
        nextUploadItemStatus(pendingItem)
    }
}

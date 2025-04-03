import { getState } from '../store/useAppStore'
import { filterPendingItems } from './filterPendingItems'
import { UploadItem } from './makeUploadItem'
import { nextUploadItemStatus } from './nextUploadItemStatus'

let currentSessionId: number = 0

export function tryStartUploadFromQueue(): void {
    currentSessionId += 1
    const sessionId: number = currentSessionId

    const uploadItems: UploadItem[] = getState().uploadItems

    const pendingItems: UploadItem[] = filterPendingItems(uploadItems, true)
    if (pendingItems.length === 0) return

    for (const pendingItem of pendingItems) {
        if (sessionId !== currentSessionId) break

        nextUploadItemStatus(pendingItem.id, true)
    }
}

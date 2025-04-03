import { checkIsPendingItem } from './checkIsPendingItem'
import { UploadItem } from './makeUploadItem'

export function filterPendingItems(uploadItems: UploadItem[], isReady?: boolean): UploadItem[] {
    return uploadItems.filter((item) => checkIsPendingItem(item, isReady))
}

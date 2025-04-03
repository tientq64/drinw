import { checkIsFinishedItem } from './checkIsFinishedItem'
import { UploadItem } from './makeUploadItem'

export function filterFinishedSubItems(
    uploadItems: UploadItem[],
    subItemIds: string[]
): UploadItem[] {
    if (subItemIds.length === 0) return []

    return uploadItems.filter((item) => {
        return checkIsFinishedItem(item) && subItemIds.includes(item.id)
    })
}

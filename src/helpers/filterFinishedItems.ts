import { checkIsFinishedItem } from './checkIsFinishedItem'
import { UploadItem } from './makeUploadItem'

export function filterFinishedItems(uploadItems: UploadItem[]): UploadItem[] {
    return uploadItems.filter((item) => checkIsFinishedItem(item))
}

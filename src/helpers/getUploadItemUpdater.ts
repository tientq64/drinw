import { setUploadItemFailed } from '../store/setUploadItemFailed'
import { UploadItem } from '../store/types'
import { updateUploadItem } from '../store/updateUploadItem'
import { nextUploadItemStatus } from './nextUploadItemStatus'

export function getUploadItemUpdater(uploadItem: UploadItem) {
    return {
        update: (updateData: Partial<UploadItem>): void => {
            updateUploadItem(uploadItem, updateData)
        },
        message: (message: string): void => {
            updateUploadItem(uploadItem, { message })
        },
        setFailed: (failureReason: unknown): void => {
            setUploadItemFailed(uploadItem, failureReason)
        },
        next: (): void => {
            nextUploadItemStatus(uploadItem)
        }
    }
}

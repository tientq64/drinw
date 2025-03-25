import { setUploadItemFailed } from '../store/setUploadItemFailed'
import { UploadItem } from '../store/types'
import { updateUploadItem } from '../store/updateUploadItem'

export function useUpdateUploadItem(uploadItem: UploadItem) {
    return {
        update: (updateData: Partial<UploadItem>): void => {
            updateUploadItem(uploadItem, updateData)
        },
        setFailed: (failureReason: unknown): void => {
            setUploadItemFailed(uploadItem, failureReason)
        }
    }
}

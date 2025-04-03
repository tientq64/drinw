import { handleUploadItemFailed } from '../helpers/handleUploadItemFailed'
import { UploadItem } from '../helpers/makeUploadItem'
import { getUploadItem } from './getUploadItem'
import { updateUploadItem } from './updateUploadItem'

export function setUploadItemFailed(id: string, failureReason: unknown): void {
    const uploadItem: UploadItem | undefined = getUploadItem(id)
    if (uploadItem === undefined) return

    const message: string = String(failureReason)
    updateUploadItem(id, { message })

    handleUploadItemFailed(uploadItem)
}

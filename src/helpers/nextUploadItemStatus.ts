import { UploadStatusEnum } from '../constants/uploadStatuses'
import { getUploadItem } from '../store/getUploadItem'
import { handleUploadItemDownloading } from './handleUploadItemDownloading'
import { handleUploadItemPreload } from './handleUploadItemPreload'
import { handleUploadItemSuccess } from './handleUploadItemSuccess'
import { handleUploadItemUploading } from './handleUploadItemUploading'
import { handleUploadItemWaiting } from './handleUploadItemWaiting'
import { UploadItem } from './makeUploadItem'

export function nextUploadItemStatus(uploadItemId: string, isPending: boolean): void {
    const uploadItem: UploadItem | undefined = getUploadItem(uploadItemId)
    if (uploadItem === undefined) return

    switch (uploadItem.statusName) {
        case UploadStatusEnum.Idle:
            handleUploadItemPreload(uploadItem)
            break

        case UploadStatusEnum.Preload:
            handleUploadItemWaiting(uploadItem)
            break

        case UploadStatusEnum.Waiting:
            handleUploadItemDownloading(uploadItem)
            break

        case UploadStatusEnum.Downloading:
            handleUploadItemUploading(uploadItem)
            break

        case UploadStatusEnum.Uploading:
            handleUploadItemSuccess(uploadItem)
            break
    }
}

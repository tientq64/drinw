import { UploadStatusEnum } from '../constants/uploadStatuses'
import { getUploadItem } from '../store/getUploadItem'
import { UploadItem } from '../store/types'
import { handleUploadItemDownloading } from './handleUploadItemDownloading'
import { handleUploadItemPreload } from './handleUploadItemPreload'
import { handleUploadItemSuccess } from './handleUploadItemSuccess'
import { handleUploadItemUploading } from './handleUploadItemUploading'
import { handleUploadItemWaiting } from './handleUploadItemWaiting'

export function nextUploadItemStatus(uploadItem: UploadItem): void {
    const latestUploadItem: UploadItem | undefined = getUploadItem(uploadItem)
    if (latestUploadItem === undefined) return

    switch (latestUploadItem.statusName) {
        case UploadStatusEnum.Idle:
            handleUploadItemPreload(latestUploadItem)
            break

        case UploadStatusEnum.Preload:
            handleUploadItemWaiting(latestUploadItem)
            break

        case UploadStatusEnum.Waiting:
            handleUploadItemDownloading(latestUploadItem)
            break

        case UploadStatusEnum.Downloading:
            handleUploadItemUploading(latestUploadItem)
            break

        case UploadStatusEnum.Uploading:
            handleUploadItemSuccess(latestUploadItem)
            break
    }
}

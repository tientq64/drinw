import { UploadStatusEnum } from '../constants/uploadStatuses'
import { getUploadItemUpdater } from './getUploadItemUpdater'
import { UploadItem } from './makeUploadItem'
import { tryStartUploadFromQueue } from './tryStartUploadFromQueue'

export function handleUploadItemWaiting(uploadItem: UploadItem): void {
    const { setup } = getUploadItemUpdater(uploadItem.id)

    setup(UploadStatusEnum.Waiting)

    tryStartUploadFromQueue()
}

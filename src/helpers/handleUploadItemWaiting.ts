import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from './makeUploadItem'
import { getUploadItemUpdater } from './getUploadItemUpdater'
import { tryStartUploadFromQueue } from './tryStartUploadFromQueue'

export function handleUploadItemWaiting(uploadItem: UploadItem): void {
    const { update } = getUploadItemUpdater(uploadItem)

    update({
        statusName: UploadStatusEnum.Waiting
    })

    tryStartUploadFromQueue()
}

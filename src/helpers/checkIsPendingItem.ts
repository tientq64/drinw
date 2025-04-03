import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from './makeUploadItem'

export function checkIsPendingItem(uploadItem: UploadItem, isReady?: boolean): boolean {
    const isPending: boolean =
        uploadItem.statusName === UploadStatusEnum.Idle ||
        uploadItem.statusName === UploadStatusEnum.Waiting

    const matchesIsReady: boolean = isReady === undefined || uploadItem.isReady === isReady

    return isPending && matchesIsReady
}

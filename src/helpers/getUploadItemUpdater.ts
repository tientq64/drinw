import { UploadStatusEnum } from '../constants/uploadStatuses'
import { setUploadItemFailed } from '../store/setUploadItemFailed'
import { updateUploadItem } from '../store/updateUploadItem'
import { UploadItem } from './makeUploadItem'
import { nextUploadItemStatus } from './nextUploadItemStatus'

export function getUploadItemUpdater(uploadItemId: string) {
    return {
        setup: (statusName: UploadStatusEnum, keepMessage: boolean = false): void => {
            const updateData: Partial<UploadItem> = {
                statusName,
                progress: 0
            }
            if (!keepMessage) {
                updateData.message = ''
            }
            updateUploadItem(uploadItemId, updateData)
        },
        update: (updateData: Partial<UploadItem>): void => {
            updateUploadItem(uploadItemId, updateData)
        },
        message: (message: string): void => {
            updateUploadItem(uploadItemId, { message })
        },
        setFailed: (failureReason: unknown): void => {
            setUploadItemFailed(uploadItemId, failureReason)
        },
        next: (): void => {
            nextUploadItemStatus(uploadItemId, false)
        }
    }
}

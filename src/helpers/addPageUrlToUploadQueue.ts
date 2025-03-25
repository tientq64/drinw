import { nanoid } from 'nanoid'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { addUploadItem } from '../store/addUploadItem'
import { Account, UploadItem } from '../store/types'
import { estimateFileSize } from './estimateFileSize'
import { DriveFile } from './getGoogleDrive'

interface Options {
    pageUrl: string
    isSmartUpload: boolean
    account?: Account
    destDir?: DriveFile
}

export function addPageUrlToUploadQueue({
    pageUrl,
    isSmartUpload,
    account,
    destDir
}: Options): void {
    const uploadItem: UploadItem = {
        id: nanoid(),
        statusName: UploadStatusEnum.Idle,
        isSmartUpload,
        progress: 0,
        estimatedSize: estimateFileSize(pageUrl),
        pageUrl,
        account,
        destDir
    }
    addUploadItem(uploadItem)
}

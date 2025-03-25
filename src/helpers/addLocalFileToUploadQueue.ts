import { nanoid } from 'nanoid'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { addUploadItem } from '../store/addUploadItem'
import { Account, UploadItem } from '../store/types'
import { DriveFile } from './getGoogleDrive'

interface Options {
    localFile: File
    account: Account
    destDir: DriveFile
}

export function addLocalFileToUploadQueue({ localFile, account, destDir }: Options): void {
    const uploadItem: UploadItem = {
        id: nanoid(),
        statusName: UploadStatusEnum.Idle,
        isSmartUpload: false,
        progress: 0,
        estimatedSize: localFile.size,
        localFile,
        account,
        destDir,
        fileName: localFile.name,
        fileSize: localFile.size
    }
    addUploadItem(uploadItem)
}

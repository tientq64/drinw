import { Stats, statSync } from 'fs-extra'
import { nanoid } from 'nanoid'
import { basename } from 'path'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { addUploadItem } from '../store/addUploadItem'
import { Account, UploadItem } from '../store/types'
import { DriveFile } from './getGoogleDrive'

interface Options {
    localFilePath: string
    account: Account
    destDir: DriveFile
}

export function addLocalFilePathToUploadQueue({ localFilePath, account, destDir }: Options): void {
    const stats: Stats = statSync(localFilePath)

    const fileName: string = basename(localFilePath)
    const fileSize: number = stats.size

    const uploadItem: UploadItem = {
        id: nanoid(),
        statusName: UploadStatusEnum.Idle,
        isSmartUpload: false,
        progress: 0,
        estimatedSize: fileSize,
        localFilePath,
        account,
        destDir,
        fileName,
        fileSize
    }
    addUploadItem(uploadItem)
}

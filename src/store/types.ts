import { AccountKindEnum } from '../constants/accountKinds'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { DriveFile } from '../helpers/getGoogleDrive'

export interface Account {
    email: string
    title?: string
    kindName?: AccountKindEnum
    mainDirId?: string
    tiktokUsernameFirstLetter?: string
    driveSize: number
    trashSize: number
    privateKey: string
}

export interface UploadItem {
    id: string
    statusName: UploadStatusEnum
    isSmartUpload: boolean
    progress: number
    totalProgress?: number
    estimatedSize?: number
    pageUrl?: string
    localFile?: File
    account?: Account
    destDir?: DriveFile
    fileName?: string
    fileSize?: number
    fileId?: string
    userId?: string
    userName: string
    userUrl?: string
    channelId?: string
    channelUrl?: string
    tempDownloadFilePath?: string
    uploadedFile?: DriveFile
    failureReason?: string
}

import { Stats, statSync } from 'fs-extra'
import { nanoid } from 'nanoid'
import { basename } from 'path'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { getState } from '../store/useAppStore'
import { estimateFileSize } from './estimateFileSize'
import { File } from './getGoogleDrive'

export interface UploadItem {
    id: string
    statusName: UploadStatusEnum
    isSmartUpload: boolean
    progress: number
    totalProgress?: number
    estimatedSize?: number
    pageUrl?: string
    localFilePath?: string
    localDirPath?: string
    subItems: UploadItem[]
    isSubItem: boolean
    destDir?: File
    fileName?: string
    fileSize?: number
    fileId?: string
    userId?: string
    userName?: string
    userUrl?: string
    channelId?: string
    channelUrl?: string
    tempDownloadFilePath?: string
    uploadedFile?: File
    message?: string
}

type MakeUploadItemPickKeys =
    | 'isSmartUpload'
    | 'estimatedSize'
    | 'pageUrl'
    | 'localFilePath'
    | 'localDirPath'
    | 'isSubItem'
    | 'destDir'
    | 'fileName'
    | 'fileSize'
type MakeUploadItem = Partial<Pick<UploadItem, MakeUploadItemPickKeys>>

export function makeUploadItem(partial: MakeUploadItem): UploadItem {
    let {
        isSmartUpload,
        estimatedSize,
        pageUrl,
        localFilePath,
        localDirPath,
        isSubItem = false,
        destDir,
        fileName,
        fileSize
    } = partial

    if (localFilePath !== undefined) {
        localFilePath = localFilePath.replaceAll('\\', '/')
        const stats: Stats = statSync(localFilePath)
        isSmartUpload = false
        fileName = basename(localFilePath)
        fileSize = stats.size
        estimatedSize = fileSize
    } //
    else if (localDirPath !== undefined) {
        localDirPath = localDirPath.replace('\\', '/')
        isSmartUpload = false
        fileName = basename(localDirPath)
    } //
    else if (pageUrl !== undefined) {
        isSmartUpload ??= getState().isDefaultSmartUpload
        estimatedSize ??= estimateFileSize(pageUrl)
    } //
    else {
        throw Error('Thiếu "localFilePath" hoặc "pageUrl"')
    }

    return {
        id: nanoid(),
        statusName: UploadStatusEnum.Idle,
        isSmartUpload,
        progress: 0,
        estimatedSize,
        pageUrl,
        localFilePath,
        localDirPath,
        subItems: [],
        isSubItem,
        destDir,
        fileName,
        fileSize
    }
}

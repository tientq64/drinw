import { Stats, statSync } from 'fs-extra'
import { nanoid } from 'nanoid'
import { basename } from 'path'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { getState } from '../store/useAppStore'
import { formatPath } from '../utils/formatPath'
import { estimateFileSize } from './estimateFileSize'
import { File } from './getGoogleDrive'
import { findAccountKindByDomain } from '../constants/accountKinds'
import { parseUrl } from './parseUrl'

export interface UploadItem {
    readonly id: string
    statusName: UploadStatusEnum
    isSmartUpload: boolean
    progress: number
    totalProgress?: number
    estimatedSize?: number
    pageUrl?: string
    localFilePath?: string
    localDirPath?: string
    sourceCode?: string
    isSubItem: boolean
    subItemIds: string[]
    allSubItemIds: string[]
    isReady: boolean
    kindName?: string
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

export function makeUploadItem({
    isSmartUpload,
    estimatedSize,
    pageUrl,
    localFilePath,
    localDirPath,
    sourceCode,
    isSubItem = false,
    isReady = true,
    kindName,
    destDir,
    fileName,
    fileSize
}: Partial<UploadItem>): UploadItem {
    isSmartUpload ??= getState().isDefaultSmartUpload

    if (localFilePath !== undefined) {
        localFilePath = formatPath(localFilePath)
        const stats: Stats = statSync(localFilePath)
        isSmartUpload = false
        fileName = basename(localFilePath)
        fileSize = stats.size
        estimatedSize = fileSize
    } //
    else if (localDirPath !== undefined) {
        localDirPath = formatPath(localDirPath)
        isSmartUpload = false
        fileName = basename(localDirPath)
    } //
    else if (pageUrl !== undefined) {
        estimatedSize ??= estimateFileSize(pageUrl)
        const domain: string = parseUrl(pageUrl).domain
        kindName ??= findAccountKindByDomain(domain)?.name
    } //
    else if (sourceCode !== undefined) {
    } //
    else {
        throw Error('Thiếu "localFilePath", "localDirPath", "pageUrl" hoặc "sourceCode"')
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
        sourceCode,
        isSubItem,
        subItemIds: [],
        allSubItemIds: [],
        isReady,
        kindName,
        destDir,
        fileName,
        fileSize
    }
}

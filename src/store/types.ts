import { AccountKindEnum } from '../constants/accountKinds'
import { UploadStatusEnum } from '../constants/uploadStatuses'

export interface Account {
	clientEmail: string
	title?: string
	kindName?: AccountKindEnum
	mainDirId?: string
	tiktokUsernameFirstLetter?: string
	driveSize: number
	trashSize: number
	privateKey: string
}

export interface Dir {
	dirId: string
	dirName: string
}

export interface UploadItem {
	id: string
	isSmartUpload: boolean
	status: UploadStatusEnum
	progressSize: number
	account?: Account
	destDirId?: string
	sourceFilePath?: string
	sourceUrl?: string
	title?: string
	thumbnailUrl?: string
	kindName?: AccountKindEnum
	userId?: string
	userName?: string
	fileId?: string
	fileExt?: string
	fileSize?: number
	fileResolution?: string
	failedReason?: string
}

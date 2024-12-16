import { drive_v3, google } from 'googleapis'
import { Account } from '../store/useAppStore'
import { getGoogleAuth } from './getGoogleAuth'

export type Drive = drive_v3.Drive
export type DriveFile = drive_v3.Schema$File
export type DriveFileList = drive_v3.Schema$FileList

export function getGoogleDrive(account: Account): Drive {
	const auth = getGoogleAuth(account)
	const drive = google.drive({
		version: 'v3',
		auth
	})
	return drive
}

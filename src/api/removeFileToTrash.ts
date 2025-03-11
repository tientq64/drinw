import { FILE_FIELDS } from '../constants/constants'
import { Drive, DriveFile, getGoogleDrive } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'

export async function removeFileToTrash(account: Account, fileId: string) {
	const drive: Drive = getGoogleDrive(account)
	const result = await drive.files.update({
		fileId,
		fields: FILE_FIELDS,
		requestBody: {
			trashed: true
		}
	})
	const file: DriveFile = result.data
	return file
}

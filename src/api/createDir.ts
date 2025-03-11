import { GaxiosResponse } from 'gaxios'
import { Drive, DriveFile, getGoogleDrive } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'
import { DRIVE_DIR_MIME_TYPE, FILE_FIELDS } from '../constants/constants'

const creatingDirPromises: Record<string, Promise<GaxiosResponse<DriveFile>> | undefined> = {}

export async function createDir(
	account: Account,
	name: string,
	parentId: string,
	description?: string
): Promise<DriveFile> {
	const drive: Drive = getGoogleDrive(account)
	const key: string = [account.clientEmail, parentId, name].join('/')

	if (creatingDirPromises[key] === undefined) {
		creatingDirPromises[key] = drive.files.create({
			fields: FILE_FIELDS,
			requestBody: {
				mimeType: DRIVE_DIR_MIME_TYPE,
				parents: [parentId],
				name,
				description
			}
		})
	}

	const result = await creatingDirPromises[key]
	const dir: DriveFile = result.data

	if (creatingDirPromises[key] !== undefined) {
		delete creatingDirPromises[key]
	}
	return dir
}

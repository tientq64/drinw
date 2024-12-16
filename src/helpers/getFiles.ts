import { Account } from '../store/useAppStore'
import { Drive, getGoogleDrive } from './getGoogleDrive'
import { makeDriveQuery } from './makeDriveQuery'

export interface Options {
	dirId: string
	name?: string
	mimeType?: 'folder' | 'file'
	trashed?: boolean
	fields?: string
	orderBy?: string
	pageSize?: number
	pageToken?: string
}

export async function getFiles(
	account: Account,
	{
		dirId,
		name,
		mimeType,
		trashed,
		fields,
		orderBy = 'folder,createdTime desc',
		pageSize,
		pageToken
	}: Options
) {
	const drive: Drive = getGoogleDrive(account)

	const q: string = makeDriveQuery(
		trashed || `'${dirId}' in parents`,
		name !== undefined && `name='${name.replaceAll("'", "\\'")}'`,
		mimeType !== undefined && `mimeType='application/vnd.google-apps.${mimeType}'`,
		trashed !== undefined && `trashed=${String(trashed)}`
	)
	const result = await drive.files.list({
		q,
		fields,
		orderBy,
		pageSize,
		pageToken: pageToken
	})
	return result
}

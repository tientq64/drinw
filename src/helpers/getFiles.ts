import { Account } from '../store/useAppStore'
import { Drive, getGoogleDrive } from './getGoogleDrive'
import { makeDriveQuery } from './makeDriveQuery'

type OrderBy =
	| 'createdTime'
	| 'folder'
	| 'modifiedByMeTime'
	| 'modifiedTime'
	| 'name'
	| 'name_natural'
	| 'quotaBytesUsed'
	| 'recency'
	| 'sharedWithMeTime'
	| 'starred'
	| 'viewedByMeTime'

interface Options {
	dirId: string
	name?: string
	mimeType?: 'folder' | 'file'
	trashed?: boolean
	fields?: string
	orderBy?: OrderBy
	pageSize?: number
}

export async function getFiles(
	account: Account,
	{ dirId, name, mimeType, trashed, fields, orderBy, pageSize }: Options
) {
	const drive: Drive = getGoogleDrive(account)

	const q: string = makeDriveQuery(
		`'${dirId}' in parents`,
		name !== undefined && `name='${name.replaceAll("'", "\\'")}'`,
		mimeType !== undefined && `mimeType='application/vnd.google-apps.${mimeType}'`,
		trashed !== undefined && `trashed=${String(trashed)}`
	)
	console.log(q)
	const result = await drive.files.list({
		q,
		fields,
		orderBy,
		pageSize
	})
	return result
}

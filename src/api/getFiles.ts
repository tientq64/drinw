import { driveFileFields } from '../constants/constants'
import { Drive, DriveFileList, getGoogleDrive } from '../helpers/getGoogleDrive'
import { makeDriveQuery } from '../helpers/makeDriveQuery'
import { Account } from '../store/types'

interface GetFileOptions {
    dirId: string
    trashed?: boolean
    pageToken?: string
}

export async function getFiles(
    account: Account,
    { dirId, trashed = false, pageToken }: GetFileOptions
): Promise<DriveFileList> {
    const drive: Drive = getGoogleDrive(account)

    const q: string = makeDriveQuery(
        trashed || `'${dirId}' in parents`,
        trashed && `trashed=${trashed}`
    )
    const result = await drive.files.list({
        q,
        fields: `files(${driveFileFields}),nextPageToken`,
        orderBy: 'folder,createdTime desc',
        pageSize: 100,
        pageToken
    })
    return result.data
}

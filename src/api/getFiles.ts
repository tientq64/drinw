import { driveFileFields } from '../constants/constants'
import { Drive, DriveFileList, getGoogleDrive } from '../helpers/getGoogleDrive'
import { makeDriveQuery } from '../helpers/makeDriveQuery'
import { Account } from '../store/types'
import { wait } from '../utils/wait'

export interface GetFilesOptions {
    dirId: string
    trashed?: boolean
    pageToken?: string
}

export async function getFiles(
    account: Account,
    { dirId, trashed = false, pageToken }: GetFilesOptions
): Promise<DriveFileList> {
    const drive: Drive = getGoogleDrive(account)

    const q: string = makeDriveQuery(
        trashed ? 'trashed=true' : `'${dirId}' in parents and trashed=false`
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

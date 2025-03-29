import { fileFields } from '../constants/constants'
import { Drive, File, FileList, getGoogleDrive } from '../helpers/getGoogleDrive'
import { makeDriveQuery } from '../helpers/makeDriveQuery'
import { makeFile } from '../helpers/makeFile'

export interface GetFilesOptions {
    trashed?: boolean
    pageToken?: string
}

export async function getFiles(
    dir: File,
    { trashed = false, pageToken }: GetFilesOptions
): Promise<FileList> {
    const drive: Drive = getGoogleDrive(dir.account)

    const q: string = makeDriveQuery(
        trashed ? 'trashed=true' : `'${dir.id}' in parents and trashed=false`
    )
    const result = await drive.files.list({
        q,
        fields: `files(${fileFields}),nextPageToken`,
        orderBy: 'folder,createdTime desc',
        pageSize: 100,
        pageToken
    })

    let files: File[] | undefined = undefined
    if (result.data.files !== undefined) {
        files = result.data.files.map((file) => makeFile(file, dir.account))
    }

    return {
        files,
        nextPageToken: result.data.nextPageToken ?? undefined,
        incompleteSearch: result.data.incompleteSearch ?? undefined
    }
}

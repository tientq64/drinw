import { fileFields } from '../constants/constants'
import { Drive, File, FileList, getGoogleDrive } from '../helpers/getGoogleDrive'
import { makeDriveQuery, SubQuery } from '../helpers/makeDriveQuery'
import { makeFile } from '../helpers/makeFile'

export interface GetFilesOptions {
    trashed?: boolean
    explicitlyTrashed?: boolean | null
    pageToken?: string
}

export async function getFiles(
    dir: File,
    { trashed = false, explicitlyTrashed = true, pageToken }: GetFilesOptions
): Promise<FileList> {
    const drive: Drive = getGoogleDrive(dir.account)

    let queries: SubQuery[] = []

    if (trashed) {
        queries.push('trashed=true')
        if (typeof explicitlyTrashed === 'boolean') {
            queries.push(`explicitlyTrashed=${explicitlyTrashed}`)
        }
    } else {
        queries.push(`'${dir.id}' in parents and trashed=false`)
    }

    const q: string = makeDriveQuery(queries)
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

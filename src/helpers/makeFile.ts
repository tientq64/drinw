import { nanoid } from 'nanoid'
import { Account } from '../store/types'
import { DriveFile, File } from './getGoogleDrive'

export function makeFile(driveFile: DriveFile | File, account: Account): File {
    if ('account' in driveFile) return driveFile

    const file: File = {
        ...driveFile,
        account,
        updateToken: nanoid()
    }
    if (file.thumbnailLink != null) {
        file.thumbnailLink = file.thumbnailLink.replace(/=s220$/, '=s160')
    }

    return file
}

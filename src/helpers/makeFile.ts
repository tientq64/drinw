import { Account } from '../store/types'
import { DriveFile, File } from './getGoogleDrive'

export function makeFile(file: DriveFile | File, account: Account): File {
    if ('account' in file) return file

    return { ...file, account }
}

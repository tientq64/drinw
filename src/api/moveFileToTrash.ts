import { DriveFile } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'
import { updateFile } from './updateFile'

export function moveFileToTrash(file: DriveFile, account: Account): Promise<DriveFile> {
    return updateFile(account, file, { trashed: true })
}

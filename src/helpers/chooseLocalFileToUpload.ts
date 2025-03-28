import { ipcRenderer } from 'electron'
import { Account } from '../store/types'
import { addLocalFilePathToUploadQueue } from './addLocalFilePathToUploadQueue'
import { DriveFile } from './getGoogleDrive'

export function chooseLocalFileToUpload(account: Account, destDir: DriveFile): void {
    const filePaths: string[] | undefined = ipcRenderer.sendSync('chooseLocalFileToUpload')
    if (filePaths === undefined) return

    for (const filePath of filePaths) {
        addLocalFilePathToUploadQueue({ localFilePath: filePath, account, destDir })
    }
}

import { ipcRenderer } from 'electron'
import { Account } from '../store/types'
import { DriveFile } from './getGoogleDrive'

export function chooseLocalFileToUpload(account: Account, destDir: DriveFile): void {
    const filePaths: string[] | undefined = ipcRenderer.sendSync('chooseLocalFileToUpload')
    console.log(filePaths)
}

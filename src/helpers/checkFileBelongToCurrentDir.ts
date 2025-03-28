import { checkFileBelongToDir } from './checkFileBelongToDir'
import { getCurrentDir } from './getCurrentDir'
import { DriveFile } from './getGoogleDrive'

export function checkFileBelongToCurrentDir(file: DriveFile): boolean {
    const currentDir: DriveFile | undefined = getCurrentDir()

    return checkFileBelongToDir(file, currentDir)
}

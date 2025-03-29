import { checkFileBelongToDir } from './checkFileBelongToDir'
import { getCurrentDir } from './getCurrentDir'
import { File } from './getGoogleDrive'

export function checkFileBelongToCurrentDir(file: File): boolean {
    const currentDir: File | undefined = getCurrentDir()

    return checkFileBelongToDir(file, currentDir)
}

import { getState } from '../store/useAppStore'
import { DriveFile } from './getGoogleDrive'

export function checkFileBelongToCurrentDir(file: DriveFile): boolean {
    const currentDir: DriveFile | undefined = getState().breadcrumbItems.at(-1)

    if (currentDir === undefined) return false
    if (currentDir.id == null) return false
    if (file.parents == null) return false

    return file.parents.includes(currentDir.id)
}

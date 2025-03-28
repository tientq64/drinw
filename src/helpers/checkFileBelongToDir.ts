import { getState } from '../store/useAppStore'
import { DriveFile } from './getGoogleDrive'

export function checkFileBelongToDir(file: DriveFile, dir: DriveFile | undefined): boolean {
    if (dir === undefined) return false
    if (dir.id == null) return false

    const inTrash: boolean = getState().inTrash
    if (file.trashed) return inTrash
    if (file.parents == null) return false

    return file.parents.includes(dir.id)
}

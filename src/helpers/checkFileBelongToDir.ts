import { rootDirId } from '../constants/constants'
import { getState } from '../store/useAppStore'
import { File } from './getGoogleDrive'

export function checkFileBelongToDir(file: File, dir: File | undefined): boolean {
    if (dir === undefined) return false
    if (dir.id == null) return false

    const inTrash: boolean = getState().inTrash
    if (file.trashed) return inTrash
    if (file.trashed !== inTrash) return false

    if (file.parents == null) return false

    if (dir.id === rootDirId) {
        return file.account.email === dir.account.email
    }

    return file.parents.includes(dir.id)
}

import { File } from '../helpers/getGoogleDrive'
import { useAppStore } from '../store/useAppStore'
import { useDriveMenu } from './useDriveMenu'
import { useTrashMenu } from './useTrashMenu'

export function useDriveOrTrashMenu(dir: File) {
    const inTrash = useAppStore((state) => state.inTrash)

    const driveMenu = useDriveMenu(dir)
    const trashMenu = useTrashMenu(dir)

    return inTrash ? trashMenu : driveMenu
}

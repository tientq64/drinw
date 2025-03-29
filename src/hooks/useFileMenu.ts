import { File } from '../helpers/getGoogleDrive'
import { useDriveFileMenu } from './useDriveFileMenu'
import { useTrashedFileMenu } from './useTrashedFileMenu'

export function useFileMenu(file: File) {
    const driveFileMenu = useDriveFileMenu(file)
    const trashedFileMenu = useTrashedFileMenu(file)

    return file.trashed ? trashedFileMenu : driveFileMenu
}

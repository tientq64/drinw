import { DriveFile } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function setCurrentFiles(currentFiles: DriveFile[] | undefined): void {
    setState({ currentFiles })
}

import { formatFileList } from '../helpers/formatFileList'
import { DriveFile } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function setCurrentFiles(currentFiles: DriveFile[]): void {
    setState({
        currentFiles: formatFileList(currentFiles)
    })
}

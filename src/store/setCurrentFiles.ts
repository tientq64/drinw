import { formatFileList } from '../helpers/formatFileList'
import { File } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function setCurrentFiles(currentFiles: File[]): void {
    setState({
        currentFiles: formatFileList(currentFiles)
    })
}

import { formatFileList } from '../helpers/formatFileList'
import { DriveFile } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function addCurrentFile(newFile: DriveFile): void {
    setState((draft) => {
        draft.currentFiles = formatFileList([newFile, ...draft.currentFiles])
    })
}

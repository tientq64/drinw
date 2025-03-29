import { formatFileList } from '../helpers/formatFileList'
import { File } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function addCurrentFile(newFile: File): void {
    setState((draft) => {
        draft.currentFiles = formatFileList([newFile, ...draft.currentFiles])
    })
}

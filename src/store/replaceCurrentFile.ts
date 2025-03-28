import { reject } from 'lodash-es'
import { formatFileList } from '../helpers/formatFileList'
import { DriveFile } from '../helpers/getGoogleDrive'
import { addCurrentFile } from './addCurrentFile'
import { setState } from './useAppStore'

export function replaceCurrentFile(newFile: DriveFile): void {
    setState((draft) => {
        draft.currentFiles = reject(draft.currentFiles, { id: newFile.id })
        draft.currentFiles = formatFileList([newFile, ...draft.currentFiles])
    })
    addCurrentFile(newFile)
}

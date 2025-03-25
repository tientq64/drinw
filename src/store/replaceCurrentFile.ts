import { DriveFile } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function replaceCurrentFile(file: DriveFile, newFile: DriveFile): void {
    setState((draft) => {
        if (draft.currentFiles === undefined) return

        draft.currentFiles = draft.currentFiles.map((currentFile) => {
            return currentFile.id === file.id ? newFile : currentFile
        })
    })
}

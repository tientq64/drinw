import { DriveFile } from '../helpers/getGoogleDrive'
import { setState } from '../store/useAppStore'

export function updateCurrentFile(file: DriveFile, updateData: Partial<DriveFile>): void {
    setState((draft) => {
        if (draft.currentFiles === undefined) return

        draft.currentFiles = draft.currentFiles.map((currentFile) => {
            if (currentFile.id === file.id) {
                return { ...currentFile, ...updateData }
            }
            return currentFile
        })
    })
}

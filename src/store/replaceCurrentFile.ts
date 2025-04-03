import { File } from '../helpers/getGoogleDrive'
import { addCurrentFile } from './addCurrentFile'
import { setState } from './useAppStore'

export function replaceCurrentFile(newFile: File): void {
    setState((draft) => {
        draft.currentFiles = draft.currentFiles.filter((file) => {
            return file.id !== newFile.id
        })
    })
    addCurrentFile(newFile)
}

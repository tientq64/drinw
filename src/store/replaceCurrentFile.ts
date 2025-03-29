import { reject } from 'lodash-es'
import { File } from '../helpers/getGoogleDrive'
import { addCurrentFile } from './addCurrentFile'
import { setState } from './useAppStore'

export function replaceCurrentFile(newFile: File): void {
    setState((draft) => {
        draft.currentFiles = reject(draft.currentFiles, { id: newFile.id })
    })
    addCurrentFile(newFile)
}

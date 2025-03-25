import { some } from 'lodash-es'
import { DriveFile } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function addCurrentFile(newFile: DriveFile): void {
    setState((draft) => {
        if (draft.currentFiles === undefined) return

        const exists: boolean = some(draft.currentFiles, { id: newFile.id })
        if (exists) return

        draft.currentFiles.unshift(newFile)
    })
}

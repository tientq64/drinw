import { castArray } from 'lodash-es'
import { File } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function removeCurrentFile(id: File['id']): void
export function removeCurrentFile(ids: File['id'][]): void

export function removeCurrentFile(ids: File['id'] | File['id'][]): void {
    ids = castArray(ids).filter(Boolean)

    setState((draft) => {
        draft.currentFiles = draft.currentFiles.filter((draftFile) => {
            if (draftFile.id == null) return true

            return !ids.includes(draftFile.id)
        })
    })
}

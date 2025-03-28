import { tryStartUploadFromQueue } from '../helpers/tryStartUploadFromQueue'
import { UploadItem } from './types'
import { setState } from './useAppStore'

export function addUploadItem(uploadItem: UploadItem): void {
    setState((draft) => {
        draft.uploadItems.push(uploadItem)
    })

    tryStartUploadFromQueue()
}

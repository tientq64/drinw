import { getState, setState } from './useAppStore'
import { UploadItem } from './types'

export function addUploadItem(uploadItem: UploadItem): void {
    setState((draft) => {
        draft.uploadItems.push(uploadItem)
    })
}

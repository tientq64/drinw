import { UploadItem } from '../helpers/makeUploadItem'
import { setState } from './useAppStore'

export function addUploadItem(uploadItem: UploadItem): void {
    setState((draft) => {
        draft.uploadItems.push(uploadItem)
    })
}

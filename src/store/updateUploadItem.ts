import { find } from 'lodash-es'
import { UploadItem } from './types'
import { setState } from './useAppStore'

export function updateUploadItem(uploadItem: UploadItem, updateData: Partial<UploadItem>): void {
    setState((draft) => {
        const draftUploadItem = find(draft.uploadItems, { id: uploadItem.id })
        if (draftUploadItem === undefined) return
        Object.assign(draftUploadItem, updateData)
    })
}

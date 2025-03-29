import { find } from 'lodash-es'
import { UploadItem } from '../helpers/makeUploadItem'
import { setState } from './useAppStore'

export function updateUploadItem(uploadItem: UploadItem, updateData: Partial<UploadItem>): void {
    setState((draft) => {
        const draftItem = find(draft.uploadItems, { id: uploadItem.id })
        if (draftItem === undefined) return

        Object.assign(draftItem, updateData)
    })
}

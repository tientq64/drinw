import { UploadItem } from '../helpers/makeUploadItem'
import { setState } from './useAppStore'

export function updateUploadItem(id: string, updateData: Partial<UploadItem>): void
export function updateUploadItem(ids: string[], updateData: Partial<UploadItem>): void

export function updateUploadItem(ids: string | string[], updateData: Partial<UploadItem>): void {
    setState((draft) => {
        if (Array.isArray(ids)) {
            if (ids.length === 0) return

            for (const draftItem of draft.uploadItems) {
                if (!ids.includes(draftItem.id)) continue

                Object.assign(draftItem, updateData)
            }
        } else {
            const draftItem = draft.uploadItems.find((item) => item.id === ids)
            if (draftItem === undefined) return

            Object.assign(draftItem, updateData)
        }
    })
}

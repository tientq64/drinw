import { UploadItem } from '../helpers/makeUploadItem'
import { getState } from './useAppStore'

export function getUploadItem(id: string): UploadItem | undefined
export function getUploadItem(ids: string[]): UploadItem[]

export function getUploadItem(ids: string | string[]): UploadItem | UploadItem[] | undefined {
    if (Array.isArray(ids)) {
        return getState().uploadItems.filter((item) => ids.includes(item.id))
    }
    return getState().uploadItems.find((item) => item.id === ids)
}

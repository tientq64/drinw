import { find } from 'lodash-es'
import { UploadItem } from '../helpers/makeUploadItem'
import { getState } from './useAppStore'

export function getUploadItem(id: string): UploadItem | undefined
export function getUploadItem(uploadItem: UploadItem): UploadItem | undefined

export function getUploadItem(idOrItem: string | UploadItem): UploadItem | undefined {
    const id: string = typeof idOrItem === 'string' ? idOrItem : idOrItem.id

    return find(getState().uploadItems, { id })
}

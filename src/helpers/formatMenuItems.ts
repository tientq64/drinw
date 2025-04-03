import { ItemType } from 'antd/es/menu/interface'
import { dropRightWhile, dropWhile } from 'lodash-es'

export function formatMenuItems(items: (ItemType | boolean)[]): ItemType[] {
    let formatedItems: ItemType[] = items.filter((item) => {
        return typeof item === 'object'
    })
    formatedItems = dropWhile(formatedItems, { type: 'divider' })
    formatedItems = dropRightWhile(formatedItems, { type: 'divider' })

    return formatedItems
}

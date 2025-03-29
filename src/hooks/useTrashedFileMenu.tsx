import { ItemType } from 'antd/es/menu/interface'
import { restoreFile } from '../api/restoreFile'
import { Icon } from '../components/Icon'
import { File } from '../helpers/getGoogleDrive'

export function useTrashedFileMenu(file: File) {
    const items: ItemType[] = [
        {
            key: 'restore',
            label: 'Khôi phục',
            icon: <Icon name="undo" />,
            onClick: () => {
                restoreFile(file)
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'delete',
            label: 'Xóa vĩnh viễn',
            icon: <Icon name="delete_forever" />,
            danger: true,
            onClick: () => {}
        }
    ]

    return { items, modals: null }
}

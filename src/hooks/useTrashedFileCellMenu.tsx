import { ItemType } from 'antd/es/menu/interface'
import { restoreFile } from '../api/restoreFile'
import { Icon } from '../components/Icon'
import { DriveFile } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'

export function useTrashedFileCellMenu(file: DriveFile, account: Account) {
    const items: ItemType[] = [
        {
            key: 'restore',
            label: 'Khôi phục',
            icon: <Icon name="undo" />,
            onClick: () => {
                restoreFile(file, account)
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

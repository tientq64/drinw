import { ItemType } from 'antd/es/menu/interface'
import { Icon } from '../components/Icon'
import { folderMime } from '../constants/constants'
import { DriveFile } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'
import { useOpenFile } from './useOpenFile'
import { useRenameFileModal } from './useRenameFileModal'
import { openWithBrowser } from '../helpers/openWithBrowser'

export function useFileCellMenu(file: DriveFile, account: Account) {
    const openFile = useOpenFile()
    const renameFileModal = useRenameFileModal(file, account)

    const isDir: boolean = file.mimeType === folderMime

    const rawItems: (ItemType | boolean)[] = [
        isDir && {
            key: 'open',
            label: 'Mở',
            icon: <Icon name="folder_open" />,
            onClick: () => {
                openFile(file)
            }
        },
        {
            key: 'open-with-browser',
            label: 'Mở trong trình duyệt',
            icon: <Icon name="open_in_new" />,
            onClick: () => {
                openFile(file, true)
            }
        },
        {
            type: 'divider'
        },
        file.mimeType !== folderMime && {
            key: 'open-page-url',
            label: 'Mở link tệp gốc',
            icon: <Icon name="link" />,
            disabled: !file.properties?.pageUrl,
            onClick: () => {
                openWithBrowser(file.properties?.pageUrl)
            }
        },
        {
            key: 'open-user',
            label: 'Mở link tác giả',
            icon: <Icon name="account_box" />,
            disabled: !(file.properties?.channelUrl || file.properties?.userUrl),
            onClick: () => {
                openWithBrowser(file.properties?.channelUrl || file.properties?.userUrl)
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'rename',
            label: 'Đổi tên',
            icon: <Icon name="border_color" />,
            onClick: () => renameFileModal.setIsOpen(true)
        },
        {
            key: 'delete',
            label: 'Chuyển vào thùng rác',
            icon: <Icon name="delete" />,
            danger: true
        },
        {
            type: 'divider'
        },
        {
            key: 'info',
            label: 'Thông tin chi tiết',
            icon: <Icon name="info" />
        }
    ]
    const items: ItemType[] = rawItems.filter((rawItem) => {
        return typeof rawItem === 'object'
    })

    return { items, modals: renameFileModal.modal }
}

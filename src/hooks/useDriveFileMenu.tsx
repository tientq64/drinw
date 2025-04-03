import { ItemType } from 'antd/es/menu/interface'
import { moveFileToTrash } from '../api/moveFileToTrash'
import { Icon } from '../components/Icon'
import { folderMime } from '../constants/constants'
import { formatMenuItems } from '../helpers/formatMenuItems'
import { File } from '../helpers/getGoogleDrive'
import { openWithBrowser } from '../helpers/openWithBrowser'
import { useOpenFile } from './useOpenFile'
import { useRenameFileModal } from './useRenameFileModal'

export function useDriveFileMenu(file: File) {
    const openFile = useOpenFile()
    const renameFileModal = useRenameFileModal(file)

    const isDir: boolean = file.mimeType === folderMime

    const items: ItemType[] = formatMenuItems([
        isDir && {
            key: 'open',
            label: 'Mở',
            icon: <Icon name="folder-open" />,
            onClick: () => {
                openFile(file)
            }
        },
        {
            key: 'open-with-browser',
            label: 'Mở trong trình duyệt',
            icon: <Icon name="open-in-new" />,
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
            icon: <Icon name="account-box" />,
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
            icon: <Icon name="border-color" />,
            onClick: () => {
                renameFileModal.setIsOpen(true)
            }
        },
        {
            key: 'delete',
            label: 'Chuyển vào thùng rác',
            icon: <Icon name="delete" />,
            danger: true,
            onClick: () => {
                moveFileToTrash(file)
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'info',
            label: 'Thông tin chi tiết',
            icon: <Icon name="info" />
        }
    ])

    return { items, modals: renameFileModal.modal }
}

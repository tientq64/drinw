import { ItemType } from 'antd/es/menu/interface'
import { Icon } from '../components/Icon'
import { chooseLocalFileToUpload } from '../helpers/chooseLocalFileToUpload'
import { DriveFile } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'
import { useAppStore } from '../store/useAppStore'
import { useCreateDirModal } from './useCreateDirModal'
import { useDriveNavigate } from './useDriveNavigate'
import { useOpenFile } from './useOpenFile'
import { useUploadFromUrlModal } from './useUploadFromUrlModal'

export function useDrivePageMenu(account: Account, dir: DriveFile) {
    const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)

    const openFile = useOpenFile()
    const createDirModal = useCreateDirModal(dir, account)
    const uploadFromUrlModal = useUploadFromUrlModal(account, dir)
    const driveNavigate = useDriveNavigate()

    const items: ItemType[] = [
        {
            key: 'go-parent',
            label: 'Đến thư mục cha',
            icon: <Icon name="arrow_upward" />,
            disabled: dir.id === account.mainDirId,
            onClick: () => {
                driveNavigate({
                    breadcrumbItems: breadcrumbItems.slice(0, -1)
                })
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'create-dir',
            label: 'Thư mục mới',
            icon: <Icon name="create_new_folder" />,
            onClick: () => createDirModal.setIsOpen(true)
        },
        {
            type: 'divider'
        },
        {
            key: 'upload-file',
            label: 'Tải tệp lên từ máy tính',
            icon: <Icon name="upload" />,
            onClick: () => chooseLocalFileToUpload(account, dir)
        },
        {
            key: 'upload-from-url',
            label: 'Tải tệp lên từ URL',
            icon: <Icon name="language" />,
            onClick: () => uploadFromUrlModal.setIsOpen(true)
        },
        {
            type: 'divider'
        },
        {
            key: 'open-with-browser',
            label: 'Mở thư mục hiện tại trong trình duyệt',
            icon: <Icon name="open_in_new" />,
            onClick: () => openFile(dir, true)
        }
    ]

    return {
        items,
        modals: [createDirModal.modal, uploadFromUrlModal.modal]
    }
}

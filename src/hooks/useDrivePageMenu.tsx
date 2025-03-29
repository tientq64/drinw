import { ItemType } from 'antd/es/menu/interface'
import { Icon } from '../components/Icon'
import { chooseLocalDirToUpload } from '../helpers/chooseLocalDirToUpload'
import { chooseLocalFileToUpload } from '../helpers/chooseLocalFileToUpload'
import { File } from '../helpers/getGoogleDrive'
import { useAppStore } from '../store/useAppStore'
import { useCreateDirModal } from './useCreateDirModal'
import { useDriveNavigate } from './useDriveNavigate'
import { useOpenFile } from './useOpenFile'
import { useUploadFromUrlModal } from './useUploadFromUrlModal'

export function useDrivePageMenu(dir: File) {
    const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)

    const openFile = useOpenFile()
    const createDirModal = useCreateDirModal(dir)
    const uploadFromUrlModal = useUploadFromUrlModal(dir)
    const driveNavigate = useDriveNavigate()

    const items: ItemType[] = [
        {
            key: 'go-parent',
            label: 'Đến thư mục cha',
            icon: <Icon name="arrow_upward" />,
            disabled: dir.id === dir.account.mainDirId,
            onClick: () => {
                driveNavigate({
                    breadcrumbItems: breadcrumbItems.slice(0, -1)
                })
            }
        },
        {
            key: 'refresh',
            label: 'Làm mới',
            icon: <Icon name="refresh" />,
            onClick: () => driveNavigate(undefined, true)
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
            onClick: () => chooseLocalFileToUpload(dir)
        },
        {
            key: 'upload-dir',
            label: 'Tải thư mục lên từ máy tính',
            icon: <Icon name="drive_folder_upload" />,
            onClick: () => chooseLocalDirToUpload(dir)
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
        modals: (
            <>
                {createDirModal.modal}
                {uploadFromUrlModal.modal}
            </>
        )
    }
}

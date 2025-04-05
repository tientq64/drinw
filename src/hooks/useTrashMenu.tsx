import useApp from 'antd/es/app/useApp'
import { ItemType } from 'antd/es/menu/interface'
import { emptyTrash } from '../api/emptyTrash'
import { Icon } from '../components/Icon'
import { File } from '../helpers/getGoogleDrive'
import { useDriveNavigate } from './useDriveNavigate'

export function useTrashMenu(dir: File) {
    const driveNavigate = useDriveNavigate()
    const { modal } = useApp()

    const handleEmptyTrash = async () => {
        const confirmed: boolean = await modal.confirm({
            content:
                'Tất cả các mục trong thùng rác này sẽ bị xóa vĩnh viễn, và không thể khôi phục. Bạn chắc chắn muốn xóa không?',
            okType: 'danger',
            autoFocusButton: null
        })
        if (!confirmed) return

        emptyTrash(dir.account)
    }

    const items: ItemType[] = [
        {
            key: 'refresh',
            label: 'Làm mới',
            icon: <Icon name="refresh" />,
            onClick: () => driveNavigate(undefined, true)
        },
        {
            key: 'go-drive',
            label: 'Đến ổ đĩa chính',
            icon: <Icon name="album" />,
            onClick: () => {
                driveNavigate({ inTrash: false })
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'empty-trash',
            label: 'Xóa tất cả trong thùng rác',
            icon: <Icon name="delete-sweep" />,
            danger: true,
            onClick: handleEmptyTrash
        }
    ]

    return { items, modals: null }
}

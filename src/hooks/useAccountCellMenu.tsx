import { ItemType } from 'antd/es/menu/interface'
import { useMemo } from 'react'
import { Icon } from '../components/Icon'
import { Account } from '../store/types'
import { useDriveNavigate } from './useDriveNavigate'
import { useEditAccountModal } from './useEditAccountModal'

export function useAccountCellMenu(account: Account) {
    const driveNavigate = useDriveNavigate()
    const editAccountModal = useEditAccountModal(account)

    const items = useMemo<ItemType[]>(() => {
        return [
            {
                key: 'open',
                label: 'Mở',
                icon: <Icon name="folder-open" />,
                onClick: () => {
                    driveNavigate({ currentAccount: account })
                }
            },
            {
                type: 'divider'
            },
            {
                key: 'change-kind',
                label: 'Chỉnh sửa',
                icon: <Icon name="edit-square" />,
                onClick: () => {
                    editAccountModal.setIsOpen(true)
                }
            },
            {
                type: 'divider'
            },
            {
                key: 'delete',
                label: 'Xóa',
                icon: <Icon name="delete" />,
                danger: true
            }
        ]
    }, [editAccountModal])

    return { items, modals: editAccountModal.modal }
}

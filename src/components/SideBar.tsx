import { Menu } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { ReactNode, useMemo } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { rootDir, useDriveNavigate } from '../hooks/useDriveNavigate'
import { useAppStore } from '../store/useAppStore'
import { Icon } from './Icon'

export function SideBar(): ReactNode {
    const currentAccount = useAppStore((state) => state.currentAccount)
    const inTrash = useAppStore((state) => state.inTrash)

    const navigate = useNavigate()
    const driveNavigate = useDriveNavigate()

    const accountsMatch = useMatch('/accounts')
    const driveMatch = useMatch('/drive/:hash')
    const settingsMatch = useMatch('/settings')

    const items: ItemType[] = [
        {
            key: 'accounts',
            label: 'Tài khoản',
            icon: <Icon name="switch_account" />,
            onClick: () => {
                navigate('/accounts')
            }
        },
        {
            key: 'drive',
            label: 'Drive',
            icon: <Icon name="album" />,
            disabled: currentAccount === undefined,
            onClick: () => {
                driveNavigate({ inTrash: false })
            }
        },
        {
            key: 'trash',
            label: 'Thùng rác',
            icon: <Icon name="delete" />,
            disabled: currentAccount === undefined,
            onClick: () => {
                driveNavigate({
                    inTrash: true,
                    breadcrumbItems: [rootDir]
                })
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'settings',
            label: 'Cài đặt',
            icon: <Icon name="settings" />,
            onClick: () => {
                navigate('/settings')
            }
        }
    ]

    const selectedKey = useMemo<string>(() => {
        if (accountsMatch !== null) {
            return 'accounts'
        }
        if (settingsMatch !== null) {
            return 'settings'
        }
        if (driveMatch !== null) {
            return inTrash ? 'trash' : 'drive'
        }
        return ''
    }, [accountsMatch, settingsMatch, driveMatch, inTrash])

    return (
        <div className="h-full border-r border-zinc-700" style={{ width: 260 }}>
            <Menu className="bg-zinc-900" selectedKeys={[selectedKey]} theme="dark" items={items} />
        </div>
    )
}

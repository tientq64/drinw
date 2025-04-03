import { Breadcrumb, Button, Radio, RadioChangeEvent, Space, Tooltip } from 'antd'
import { MouseEvent, ReactNode } from 'react'
import { viewModes } from '../constants/viewModes'
import { getAccountEmailName } from '../helpers/getAccountEmailName'
import { File } from '../helpers/getGoogleDrive'
import { useCurrentDir } from '../hooks/useCurrentDir'
import { useDriveNavigate } from '../hooks/useDriveNavigate'
import { setViewModeName } from '../store/setViewModeName'
import { useAppStore } from '../store/useAppStore'
import { AccountStorageBar } from './AccountStorageBar'
import { DefaultSmartUploadSwitch } from './DefaultSmartUploadSwitch'
import { Icon } from './Icon'
import { rootDirId } from '../constants/constants'

export const headerBarHeight: number = 33

export function HeaderBar(): ReactNode {
    const currentAccount = useAppStore((state) => state.currentAccount)
    const inTrash = useAppStore((state) => state.inTrash)
    const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)
    const viewModeName = useAppStore((state) => state.viewModeName)

    const currentDir = useCurrentDir()
    const driveNavigate = useDriveNavigate()

    const handleBreadcrumbItemClick = (
        breadcrumbItem: File,
        index: number,
        event: MouseEvent
    ): void => {
        event.preventDefault()
        if (currentDir === undefined) return
        if (breadcrumbItem.id === currentDir.id) return
        driveNavigate({
            breadcrumbItems: breadcrumbItems.slice(0, index + 1)
        })
    }

    const handleViewModeChange = (event: RadioChangeEvent): void => {
        setViewModeName(event.target.value)
    }

    return (
        <div
            className="flex items-center gap-3 border-b border-zinc-700 px-3 py-1"
            style={{ height: headerBarHeight }}
        >
            <Space.Compact size="small">
                <Button disabled={history.state.idx === 0} onClick={() => history.back()}>
                    <Icon name="arrow-back" />
                </Button>

                <Button
                    disabled={history.state.idx === history.length - 1}
                    onClick={() => history.forward()}
                >
                    <Icon name="arrow-forward" />
                </Button>
            </Space.Compact>

            <div className="flex-1">
                <Breadcrumb>
                    <Breadcrumb.Item className="flex items-center gap-1">
                        <Icon name="switch-account" />
                        Tài khoản
                    </Breadcrumb.Item>

                    {currentAccount !== undefined && (
                        <Breadcrumb.Item className="flex items-center gap-1">
                            <Icon name="account-circle" />
                            {getAccountEmailName(currentAccount.email)}
                            {currentAccount.title && <> - {currentAccount.title}</>}
                        </Breadcrumb.Item>
                    )}

                    {breadcrumbItems.map((breadcrumbItem, index) => (
                        <Breadcrumb.Item
                            key={breadcrumbItem.id ?? undefined}
                            className="!flex items-center gap-1"
                            href={breadcrumbItem.id === currentDir?.id ? undefined : ''}
                            onClick={(event) => {
                                handleBreadcrumbItemClick(breadcrumbItem, index, event)
                            }}
                        >
                            {breadcrumbItem.id === rootDirId && (
                                <>
                                    {!inTrash && (
                                        <>
                                            <Icon name="album" />
                                            Drive
                                        </>
                                    )}
                                    {inTrash && (
                                        <>
                                            <Icon name="delete" />
                                            Thùng rác
                                        </>
                                    )}
                                </>
                            )}

                            {breadcrumbItem.id !== rootDirId && breadcrumbItem.name}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>

            <Radio.Group size="small" value={viewModeName} onChange={handleViewModeChange}>
                {viewModes.map((viewMode) => (
                    <Tooltip
                        key={viewMode.name}
                        rootClassName="pointer-events-none"
                        destroyTooltipOnHide
                        title={viewMode.text}
                    >
                        <Radio.Button value={viewMode.name}>
                            <Icon name={viewMode.iconName} />
                        </Radio.Button>
                    </Tooltip>
                ))}
            </Radio.Group>

            <DefaultSmartUploadSwitch />

            <div className="w-[348px]">
                {currentAccount !== undefined && <AccountStorageBar account={currentAccount} />}
            </div>
        </div>
    )
}

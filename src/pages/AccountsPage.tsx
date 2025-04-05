import { Table } from 'antd'
import { TableRef } from 'antd/es/table'
import { ReactNode, UIEvent, useEffect, useRef } from 'react'
import { AutoSizer } from 'react-virtualized'
import { AccountCell } from '../components/AccountCell'
import { AccountKindLabel } from '../components/AccountKindLabel'
import { AccountStorageBar } from '../components/AccountStorageBar'
import { AccountKindEnum } from '../constants/accountKinds'
import { getAccountEmailName } from '../helpers/getAccountEmailName'
import { useDriveNavigate } from '../hooks/useDriveNavigate'
import { useTableHeaderHeight } from '../hooks/useTableHeaderHeight'
import { setBreadcrumbItems } from '../store/setBreadcrumbItems'
import { setCurrentAccount } from '../store/setCurrentAccount'
import { setInTrash } from '../store/setInTrash'
import { Account } from '../store/types'
import { useAppStore } from '../store/useAppStore'

let listScrollTop: number = 0

export function AccountsPage(): ReactNode {
    const accounts = useAppStore((state) => state.accounts)

    const driveNavigate = useDriveNavigate()
    const tableHeaderHeight: number = useTableHeaderHeight()
    const listRef = useRef<TableRef | null>(null)

    const handleAccountDoubleClick = (account: Account): void => {
        driveNavigate({ currentAccount: account })
    }

    const handleListScroll = (event: UIEvent<HTMLDivElement>): void => {
        listScrollTop = event.currentTarget.scrollTop
    }

    useEffect(() => {
        setCurrentAccount(undefined)
        setInTrash(false)
        setBreadcrumbItems([])
        window.setTimeout(() => {
            listRef.current?.scrollTo({ top: listScrollTop })
        })
    }, [])

    return (
        <div className="h-full overflow-hidden">
            <AutoSizer>
                {(size) => (
                    <Table
                        ref={listRef}
                        className="[&_.ant-table-header]:!rounded-none"
                        style={{
                            minWidth: size.width
                        }}
                        sticky
                        virtual
                        pagination={false}
                        size="small"
                        scroll={{
                            y: size.height - tableHeaderHeight
                        }}
                        rowKey="email"
                        rowClassName="[&:has(.context-menu-open)>div]:!bg-zinc-800 h-[33px] leading-4 cursor-default"
                        onHeaderRow={() => ({
                            className: '[&>th]:!rounded-none whitespace-nowrap'
                        })}
                        onRow={(account) => ({
                            onDoubleClick: () => handleAccountDoubleClick(account)
                        })}
                        onScroll={handleListScroll}
                        columns={[
                            {
                                title: '#',
                                width: size.width * 0.06,
                                render: (_, __, index) => (
                                    <div className="flex h-full items-center">{index + 1}</div>
                                )
                            },
                            {
                                title: 'Tên',
                                dataIndex: 'email',
                                className: '!py-0',
                                render: (value: string, account) => (
                                    <AccountCell account={account}>
                                        <div className="flex items-center gap-2">
                                            <img
                                                className="size-4"
                                                src="https://cdn-icons-png.flaticon.com/24/2965/2965323.png"
                                                loading="lazy"
                                            />
                                            {getAccountEmailName(value)}
                                        </div>
                                    </AccountCell>
                                )
                            },
                            {
                                title: 'Tiêu đề',
                                width: size.width * 0.25,
                                dataIndex: 'title',
                                className: '!py-0',
                                render: (value: string | undefined, account) => (
                                    <AccountCell account={account}>
                                        <div className="line-clamp-2">{value}</div>
                                    </AccountCell>
                                )
                            },
                            {
                                title: 'Thể loại',
                                dataIndex: 'kindName',
                                className: '!py-0',
                                render: (value: AccountKindEnum, account) => (
                                    <AccountCell account={account}>
                                        <AccountKindLabel kind={value} />
                                    </AccountCell>
                                )
                            },
                            {
                                title: 'Dung lượng',
                                width: size.width * 0.35,
                                render: (_, account) => (
                                    <div className="flex h-full items-center">
                                        {account.mainDirId && (
                                            <AccountStorageBar account={account} />
                                        )}
                                    </div>
                                )
                            }
                        ]}
                        dataSource={accounts}
                    />
                )}
            </AutoSizer>
        </div>
    )
}

import { useSize } from 'ahooks'
import { Table } from 'antd'
import { TableRef } from 'antd/es/table'
import { ReactNode, UIEvent, useEffect, useRef } from 'react'
import { AccountCell } from '../components/AccountCell'
import { AccountKindLabel } from '../components/AccountKindLabel'
import { AccountStorageBar } from '../components/AccountStorageBar'
import { headerBarHeight } from '../components/HeaderBar'
import { AccountKindEnum } from '../constants/accountKinds'
import { getAccountEmailName } from '../helpers/getAccountEmailName'
import { useDriveNavigate } from '../hooks/useDriveNavigate'
import { useWindowContentSize } from '../hooks/useWindowContentSize'
import { setBreadcrumbItems } from '../store/setBreadcrumbItems'
import { setCurrentAccount } from '../store/setCurrentAccount'
import { setInTrash } from '../store/setInTrash'
import { Account } from '../store/types'
import { useAppStore } from '../store/useAppStore'

let listScrollTop: number = 0

export function AccountsPage(): ReactNode {
    const accounts = useAppStore((state) => state.accounts)

    const driveNavigate = useDriveNavigate()
    const windowContentSize = useWindowContentSize()
    const mainRef = useRef<HTMLDivElement | null>(null)
    const listRef = useRef<TableRef | null>(null)
    const size = useSize(mainRef)

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
        <div ref={mainRef} className="h-full overflow-hidden">
            <Table
                ref={listRef}
                className="[&_.ant-table-header]:!rounded-none"
                sticky
                virtual
                pagination={false}
                size="small"
                rowKey="email"
                rowClassName="[&:has(.context-menu-open)>div]:!bg-zinc-800 h-[33px] leading-4 cursor-default"
                onHeaderRow={() => ({
                    className: '[&>th]:!rounded-none whitespace-nowrap'
                })}
                onRow={(account) => ({
                    onDoubleClick: () => handleAccountDoubleClick(account)
                })}
                scroll={{
                    y: windowContentSize.height - headerBarHeight - 39
                }}
                onScroll={handleListScroll}
                columns={[
                    {
                        title: '#',
                        width: size && size.width * 0.06,
                        render: (_, __, index) => index + 1
                    },
                    {
                        title: 'Tên',
                        dataIndex: 'email',
                        className: '!py-0',
                        render: (value: string, account) => (
                            <AccountCell account={account}>
                                {getAccountEmailName(value)}
                            </AccountCell>
                        )
                    },
                    {
                        title: 'Tiêu đề',
                        width: size && size.width * 0.25,
                        dataIndex: 'title',
                        className: '!py-0',
                        render: (value: string | undefined, account) => (
                            <AccountCell account={account}>{value}</AccountCell>
                        )
                    },
                    {
                        title: 'Thể loại',
                        dataIndex: 'kindName',
                        className: '!py-0',
                        render: (value: AccountKindEnum, account) => (
                            <AccountCell account={account}>
                                <AccountKindLabel kind={value} hideNone />
                            </AccountCell>
                        )
                    },
                    {
                        title: 'Dung lượng',
                        width: size && size.width * 0.35,
                        render: (_, account) =>
                            account.mainDirId && <AccountStorageBar account={account} />
                    }
                ]}
                dataSource={accounts}
            />
        </div>
    )
}

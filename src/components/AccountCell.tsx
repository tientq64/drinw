import { ReactNode } from 'react'
import { useAccountCellMenu } from '../hooks/useAccountCellMenu'
import { Account } from '../store/types'
import { ContextMenu } from './ContextMenu'

interface AccountCellProps {
    account: Account
    tabIndex?: number
    children?: ReactNode
}

export function AccountCell({ account, tabIndex, children }: AccountCellProps): ReactNode {
    const accountCellMenu = useAccountCellMenu(account)

    return (
        <>
            <ContextMenu openClassName="context-menu-open" items={accountCellMenu.items}>
                <div className="-mx-2 flex h-8 items-center px-2" tabIndex={tabIndex}>
                    {children}
                </div>
            </ContextMenu>

            {accountCellMenu.modals}
        </>
    )
}

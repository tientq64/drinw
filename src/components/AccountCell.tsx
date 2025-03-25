import { ReactNode } from 'react'
import { useAccountCellMenu } from '../hooks/useAccountCellMenu'
import { Account } from '../store/types'
import { ContextMenu } from './ContextMenu'

interface AccountCellProps {
    account: Account
    children?: ReactNode
}

export function AccountCell({ account, children }: AccountCellProps): ReactNode {
    const accountCellMenu = useAccountCellMenu(account)

    return (
        <>
            <ContextMenu
                className="flex h-8 items-center"
                openClassName="context-menu-open"
                items={accountCellMenu.items}
            >
                {children}
            </ContextMenu>

            {accountCellMenu.modals}
        </>
    )
}

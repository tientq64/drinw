import { ReactNode } from 'react'
import { DriveFile } from '../helpers/getGoogleDrive'
import { useFileCellMenu } from '../hooks/useFileCellMenu'
import { Account } from '../store/types'
import { ContextMenu } from './ContextMenu'

interface FileCellProps {
    file: DriveFile
    account: Account
    children?: ReactNode
}

export function FileCell({ file, account, children }: FileCellProps): ReactNode {
    const fileCellMenu = useFileCellMenu(file, account)

    return (
        <>
            <ContextMenu
                className="flex h-8 items-center"
                openClassName="context-menu-open"
                items={fileCellMenu.items}
            >
                <div className="line-clamp-2">{children}</div>
            </ContextMenu>

            {fileCellMenu.modals}
        </>
    )
}

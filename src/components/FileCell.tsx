import { ReactNode } from 'react'
import { File } from '../helpers/getGoogleDrive'
import { useFileMenu } from '../hooks/useFileMenu'
import { ContextMenu } from './ContextMenu'

interface FileCellProps {
    file: File
    children?: ReactNode
}

export function FileCell({ file, children }: FileCellProps): ReactNode {
    const fileMenu = useFileMenu(file)

    return (
        <>
            <ContextMenu
                className="flex h-8 items-center"
                openClassName="context-menu-open"
                items={fileMenu.items}
            >
                <div className="line-clamp-2">{children}</div>
            </ContextMenu>

            {fileMenu.modals}
        </>
    )
}

import { ReactNode } from 'react'
import { File } from '../helpers/getGoogleDrive'
import { useFileMenu } from '../hooks/useFileMenu'
import { ContextMenu } from './ContextMenu'

interface FileCellProps {
    file: File
    tabIndex?: number
    children?: ReactNode
}

export function FileCell({ file, tabIndex, children }: FileCellProps): ReactNode {
    const fileMenu = useFileMenu(file)

    return (
        <>
            <ContextMenu openClassName="context-menu-open" items={fileMenu.items}>
                <div className="flex h-8 items-center" tabIndex={tabIndex}>
                    {children}
                </div>
            </ContextMenu>

            {fileMenu.modals}
        </>
    )
}

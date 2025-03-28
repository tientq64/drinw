import { Dropdown } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { ReactNode, useEffect, useId, useState } from 'react'
import { stopPropagation } from '../utils/stopPropagation'

interface ContextMenuProps {
    className?: string
    openClassName?: string
    items: ItemType[]
    children?: ReactNode
}

let openingContextMenuId: string | undefined = undefined

const rootEl = document.getElementById('root')!

export function ContextMenu({
    className,
    openClassName,
    items,
    children
}: ContextMenuProps): ReactNode {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const contextMenuId: string = useId()

    const handleOpenChange = (value: boolean): void => {
        if (openingContextMenuId !== undefined && openingContextMenuId !== contextMenuId) return
        setIsOpen(value)
        openingContextMenuId = value ? contextMenuId : undefined
    }

    const handleRootMouseDown = (): void => {
        setIsOpen(false)
        openingContextMenuId = undefined
    }

    useEffect(() => {
        if (isOpen) {
            rootEl.addEventListener('mousedown', handleRootMouseDown)
        }
        return () => {
            rootEl.removeEventListener('mousedown', handleRootMouseDown)
            openingContextMenuId = undefined
        }
    }, [isOpen])

    return (
        <Dropdown
            className={className}
            trigger={['contextMenu']}
            open={isOpen}
            openClassName={openClassName}
            onOpenChange={handleOpenChange}
            destroyPopupOnHide
            transitionName={isOpen ? undefined : ''}
            menu={{
                className: 'pointer-events-auto',
                items,
                onDoubleClick: stopPropagation,
                onContextMenu: stopPropagation
            }}
            overlayClassName="pointer-events-none"
            align={{
                offset: [0, 0]
            }}
        >
            {children}
        </Dropdown>
    )
}

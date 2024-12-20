import { Divider, ListItemIcon, Menu, MenuItem, Portal } from '@mui/material'
import { useUpdateEffect } from 'ahooks'
import { cloneElement, JSX, MouseEvent, ReactElement, ReactNode, useEffect, useState } from 'react'

interface ContextMenuPosition {
	top: number
	left: number
}

export type ContextMenuItem =
	| {
			title?: string
			icon?: ReactElement
			disabled?: boolean
			divider?: boolean
			click?: () => void
	  }
	| boolean

interface ContextMenuProps {
	menuItems?: ContextMenuItem[] | JSX.Element
	currentTarget?: boolean
	onIsOpenChange?: (isOpen: boolean) => void
	children: ReactNode | ((isOpen: boolean) => ReactNode)
}

export function ContextMenu({
	menuItems,
	currentTarget,
	onIsOpenChange,
	children
}: ContextMenuProps): ReactNode {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [position, setPosition] = useState<ContextMenuPosition | undefined>(undefined)

	let children2: ReactNode = typeof children === 'function' ? children(isOpen) : children
	if (Array.isArray(children2)) {
		children2 = children2.filter(Boolean)[0]
	}

	if (Array.isArray(menuItems)) {
		menuItems = (
			<div>
				{menuItems.map((menuItem, index) => (
					<>
						{typeof menuItem === 'object' && !('divider' in menuItem) && (
							<MenuItem
								key={index}
								disabled={menuItem.disabled}
								onClick={menuItem.click}
							>
								<ListItemIcon>{menuItem.icon}</ListItemIcon>
								{menuItem.title}
							</MenuItem>
						)}

						{typeof menuItem === 'object' && 'divider' in menuItem && (
							<Divider key={index} />
						)}
					</>
				))}
			</div>
		)
	}

	const close = (): void => {
		setPosition(undefined)
		setIsOpen(false)
	}

	const handleContextMenu = (event: MouseEvent): void => {
		if (currentTarget && event.currentTarget !== event.target) return
		if ((event.target as HTMLElement).closest('.ContextMenu') !== null) return
		event.preventDefault()
		event.stopPropagation()
		setPosition({
			left: event.clientX + 2,
			top: event.clientY - 6
		})
		setIsOpen(true)
	}

	useUpdateEffect(() => {
		onIsOpenChange?.(isOpen)
	}, [isOpen])

	useEffect(() => {
		return close
	}, [])

	return (
		<>
			{cloneElement<any>(children2 as ReactElement, {
				onContextMenu: handleContextMenu
			})}

			<Portal>
				<Menu
					open={isOpen}
					anchorReference="anchorPosition"
					anchorPosition={position}
					transitionDuration={{
						enter: 150,
						exit: 0
					}}
					slotProps={{
						root: {
							onMouseDown: close
						},
						paper: {
							className: '!bg-zinc-800 ContextMenu',
							onMouseDown: (event) => event.stopPropagation(),
							onClick: close
						}
					}}
				>
					{menuItems}
				</Menu>
			</Portal>
		</>
	)
}

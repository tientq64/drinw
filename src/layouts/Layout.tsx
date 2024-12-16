import { ReactNode } from 'react'
import { Outlet } from 'react-router'
import { WindowTitleBar } from '../components/WindowTitleBar'

export function Layout(): ReactNode {
	return (
		<div className="flex flex-col h-full">
			<WindowTitleBar />

			<div className="flex-1 overflow-hidden">
				<Outlet />
			</div>
		</div>
	)
}

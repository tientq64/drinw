import { Divider } from '@mui/material'
import { ReactNode } from 'react'
import { Outlet } from 'react-router'
import { CurrentDirsBreadcrumbs } from '../components/CurrentDirsBreadcrumbs'
import { LeftSideBar } from '../components/LeftSideBar'
import { WindowTitleBar } from '../components/WindowTitleBar'
import { UploadPanel } from '../components/UploadPanel'

export function Layout(): ReactNode {
	return (
		<div className="flex flex-col h-full">
			<WindowTitleBar />

			<div className="flex-1 flex flex-col overflow-hidden">
				<CurrentDirsBreadcrumbs />
				<Divider />

				<div className="flex-1 flex overflow-hidden">
					<LeftSideBar />
					<Divider orientation="vertical" />

					<div className="flex-1 overflow-hidden">
						<Outlet />
					</div>
				</div>
			</div>

			<UploadPanel />
		</div>
	)
}

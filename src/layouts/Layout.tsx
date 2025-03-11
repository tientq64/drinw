import { Divider } from '@mui/material'
import { ReactNode } from 'react'
import { Outlet } from 'react-router'
import { BreadcrumbItems } from '../components/BreadcrumbItems'
import { LeftSideBar } from '../components/LeftSideBar'
import { UploadPanel } from '../components/UploadPanel'
import { WindowTitleBar } from '../components/WindowTitleBar'

export function Layout(): ReactNode {
	return (
		<div className="flex h-full flex-col">
			<WindowTitleBar />

			<div className="flex flex-1 flex-col overflow-hidden">
				<BreadcrumbItems />
				<Divider />

				<div className="flex flex-1 overflow-hidden">
					<LeftSideBar />
					<Divider orientation="vertical" />

					<div className="flex-1 overflow-hidden">
						<Outlet />
					</div>

					<Divider orientation="vertical" />
					<UploadPanel />
				</div>
			</div>
		</div>
	)
}

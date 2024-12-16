import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { CurrentDirViewer } from '../components/CurrentDirViewer'
import { CurrentDirsBreadcrumbs } from '../components/CurrentDirsBreadcrumbs'
import { TopBar } from '../components/TopBar'
import { Dir, useAppStore } from '../store/useAppStore'

export function DrivePage(): ReactNode {
	const currentDirs = useAppStore((state) => state.currentDirs)

	const currentDir: Dir | undefined = currentDirs.at(-1)
	if (currentDir === undefined) {
		return <Navigate to="/" replace />
	}

	return (
		<Box className="flex flex-col h-full">
			<TopBar title={currentDir.dirName}></TopBar>

			<div className="flex-1 flex flex-col overflow-hidden">
				<CurrentDirsBreadcrumbs />
				<CurrentDirViewer />
			</div>
		</Box>
	)
}

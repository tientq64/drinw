import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { CurrentDirFiles } from '../components/CurrentDirFiles'
import { CurrentDirsBreadcrumbs } from '../components/CurrentDirsBreadcrumbs'
import { TopBar } from '../components/TopBar'
import { Dir, useAppStore } from '../store/useAppStore'

export function DrivePage(): ReactNode {
	const currentDirs = useAppStore((state) => state.currentDirs)

	const currentDir: Dir | undefined = currentDirs.at(-1)
	if (currentDir === undefined) return

	return (
		<Box className="flex flex-col h-full">
			<TopBar title={currentDir.dirName}></TopBar>

			<div className="flex-1 flex flex-col gap-4 py-4">
				<CurrentDirsBreadcrumbs />
				<CurrentDirFiles />
			</div>
		</Box>
	)
}

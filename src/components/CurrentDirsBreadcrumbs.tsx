import { Breadcrumbs, Typography } from '@mui/material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { Dir, useAppStore } from '../store/useAppStore'

export function CurrentDirsBreadcrumbs(): ReactNode {
	const currentDirs = useAppStore((state) => state.currentDirs)

	const currentDir: Dir | undefined = currentDirs.at(-1)
	if (currentDir === undefined) return

	return (
		<Breadcrumbs className="px-8">
			{currentDirs.map((dir) => (
				<Typography
					key={dir.dirId}
					className={clsx(
						dir !== currentDir && 'hover:underline cursor-pointer',
						dir === currentDir && 'text-white'
					)}
				>
					{dir.dirName}
				</Typography>
			))}
		</Breadcrumbs>
	)
}

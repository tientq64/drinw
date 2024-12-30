import {
	AccountBoxRounded,
	DeleteRounded,
	FolderRounded,
	FolderSharedRounded,
	StorageRounded
} from '@mui/icons-material'
import { Breadcrumbs, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { filesViewModes } from '../constants/filesViewModes'
import { jumpCurrentDirs } from '../store/jumpCurrentDirs'
import { setFilesViewMode } from '../store/setFilesViewMode'
import { Dir } from '../store/types'
import { useAppStore } from '../store/useAppStore'
import { AccountUsageProgress } from './AccountUsageProgress'

export function CurrentDirsBreadcrumbs(): ReactNode {
	const currentDirs = useAppStore((state) => state.currentDirs)
	const currentAccount = useAppStore((state) => state.currentAccount)
	const isInTrash = useAppStore((state) => state.isInTrash)
	const filesViewMode = useAppStore((state) => state.filesViewMode)

	const currentDir: Dir | undefined = currentDirs.at(-1)

	const navigate = useNavigate()

	const handleCurrentDirClick = (dir: Dir): void => {
		jumpCurrentDirs(dir.dirId)
		navigate('/drive')
	}

	const handleAccountsClick = (): void => {
		navigate('/accounts')
	}

	const handleFilesViewModeButtonChange = ({}, value: any): void => {
		if (value === null) return
		setFilesViewMode(value)
	}

	return (
		<div className="flex items-center gap-8 px-4">
			<Breadcrumbs className="flex-1 py-2">
				<div
					className={clsx(
						'flex items-center gap-2',
						currentDir !== undefined && 'hover:underline cursor-pointer',
						currentDir === undefined && 'text-white pointer-events-none'
					)}
					onClick={handleAccountsClick}
				>
					<AccountBoxRounded className="!size-5" />
					Tài khoản
				</div>

				{currentDirs.map((dir, index) => (
					<div
						key={dir.dirId}
						className={clsx(
							'flex items-center gap-2',
							dir !== currentDir && 'hover:underline cursor-pointer',
							dir === currentDir && 'text-white pointer-events-none'
						)}
						onClick={() => handleCurrentDirClick(dir)}
					>
						{index === 0 && (
							<>
								{!isInTrash && <StorageRounded className="!size-5" />}
								{isInTrash && <DeleteRounded className="!size-5" />}
							</>
						)}
						{index === 1 && <FolderSharedRounded className="!size-5 text-amber-500" />}
						{index > 1 && <FolderRounded className="!size-5 text-amber-500" />}
						{dir.dirName}
					</div>
				))}
			</Breadcrumbs>

			<ToggleButtonGroup
				exclusive
				size="small"
				value={filesViewMode}
				onChange={handleFilesViewModeButtonChange}
			>
				{filesViewModes.map((viewMode) => (
					<Tooltip key={viewMode.value} title={viewMode.label}>
						<ToggleButton className="!py-0" value={viewMode.value}>
							{viewMode.icon}
						</ToggleButton>
					</Tooltip>
				))}
			</ToggleButtonGroup>

			{currentAccount && (
				<AccountUsageProgress className="gap-1 w-96 pt-1" account={currentAccount} />
			)}
		</div>
	)
}

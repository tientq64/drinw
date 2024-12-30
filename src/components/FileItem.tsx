import {
	DeleteRounded,
	DriveFileRenameOutlineRounded,
	FolderRounded,
	InfoRounded,
	OpenInBrowserRounded,
	PersonAddAltRounded
} from '@mui/icons-material'
import { Card, CardActionArea, CardMedia, TableCell, TableRow } from '@mui/material'
import clsx from 'clsx'
import { ReactNode, useMemo, useState } from 'react'
import { DRIVE_DIR_MIME_TYPE } from '../constants/constants'
import { FilesViewModeEnum } from '../constants/filesViewModes'
import { DriveFile } from '../helpers/getGoogleDrive'
import { openInBrowser } from '../helpers/openInBrowser'
import { Account } from '../store/types'
import { formatSize } from '../utils/formatSize'
import { formatVideoDuration } from '../utils/formatVideoDuration'
import { ContextMenu, ContextMenuItem } from './ContextMenu'

interface FileItemProps {
	file: DriveFile
	index: number
	viewMode: FilesViewModeEnum
	account: Account
	onFileDoubleClick: (file: DriveFile) => void
}

export function FileItem({
	file,
	index,
	viewMode,
	account,
	onFileDoubleClick
}: FileItemProps): ReactNode {
	const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false)

	const isMainDir: boolean = file.id === account.mainDirId

	const handleDoubleClick = (): void => {
		onFileDoubleClick(file)
	}

	const handleOpenFileInBrowser = (): void => {
		if (file.webViewLink == null) return
		openInBrowser(file.webViewLink)
	}

	const contextMenu = useMemo<ContextMenuItem[]>(
		() => [
			file.mimeType === DRIVE_DIR_MIME_TYPE && {
				title: 'Mở',
				icon: <FolderRounded />,
				click: handleDoubleClick
			},
			{
				title: 'Mở trong trình duyệt',
				icon: <OpenInBrowserRounded />,
				disabled: file.webViewLink == null,
				click: handleOpenFileInBrowser
			},
			{
				divider: true
			},
			isMainDir && {
				title: 'Chia sẻ với tài khoản chính',
				icon: <PersonAddAltRounded />
			},
			{
				divider: true
			},
			{
				title: 'Đổi tên',
				icon: <DriveFileRenameOutlineRounded />,
				disabled: isMainDir
			},
			{
				title: 'Xóa',
				icon: <DeleteRounded />,
				color: 'red',
				disabled: isMainDir
			},
			{
				divider: true
			},
			{
				title: 'Thông tin chi tiết',
				icon: <InfoRounded />
			}
		],
		[file, account]
	)

	return (
		<>
			{viewMode === FilesViewModeEnum.List && (
				<TableRow
					className={clsx(isContextMenuOpen && 'bg-zinc-800')}
					hover
					onDoubleClick={handleDoubleClick}
				>
					<TableCell className="!text-zinc-400">{index + 1}</TableCell>

					<ContextMenu menuItems={contextMenu} onIsOpenChange={setIsContextMenuOpen}>
						<TableCell>
							<div className="pr-16 line-clamp-1">
								{file.description || file.name}
							</div>
						</TableCell>
					</ContextMenu>

					<TableCell className="!text-zinc-400">{formatSize(file.size)}</TableCell>

					<TableCell className="!text-zinc-400">
						{file.mimeType !== DRIVE_DIR_MIME_TYPE && file.mimeType}
					</TableCell>

					<TableCell className="!text-zinc-400">
						{file.videoMediaMetadata != null && (
							<>{formatVideoDuration(file.videoMediaMetadata.durationMillis)}</>
						)}
					</TableCell>

					<TableCell className="!text-zinc-400">
						{file.imageMediaMetadata && (
							<>
								{file.imageMediaMetadata.width}
								{' x '}
								{file.imageMediaMetadata.height}
							</>
						)}
						{file.videoMediaMetadata && (
							<>
								{file.videoMediaMetadata.width}
								{' x '}
								{file.videoMediaMetadata.height}
							</>
						)}
					</TableCell>
				</TableRow>
			)}

			{viewMode === FilesViewModeEnum.Grid && (
				<ContextMenu menuItems={contextMenu} onIsOpenChange={setIsContextMenuOpen}>
					<Card
						className={clsx(isContextMenuOpen && '!bg-zinc-800')}
						onDoubleClick={handleDoubleClick}
					>
						<CardActionArea disableRipple>
							<CardMedia
								className="aspect-[16/9]"
								image={
									file.thumbnailLink == null
										? undefined
										: file.thumbnailLink.replace('=s220', '=s200')
								}
							/>
							<div className="px-2 py-1 truncate text-sm">
								{file.description || file.name}
							</div>
						</CardActionArea>
					</Card>
				</ContextMenu>
			)}
		</>
	)
}

import { DeleteRounded, HomeRounded } from '@mui/icons-material'
import {
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListSubheader,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@mui/material'
import { useInViewport, useRequest, useUpdateEffect } from 'ahooks'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { DRIVE_DIR_MIME_TYPE } from '../constants/constants'
import { getFiles } from '../helpers/getFiles'
import { DriveFile } from '../helpers/getGoogleDrive'
import { Dir, useAppStore } from '../store/useAppStore'
import { formatSize } from '../utils/formatSize'
import { formatVideoDuration } from '../utils/formatVideoDuration'
import { getAccountClientEmailName } from '../helpers/getAccountClientEmailName'

export function CurrentDirViewer(): ReactNode {
	const currentAccount = useAppStore((state) => state.currentAccount)
	if (currentAccount === undefined) return

	const emailName: string = getAccountClientEmailName(currentAccount)

	const currentDirs = useAppStore((state) => state.currentDirs)
	const currentDir: Dir | undefined = currentDirs.at(-1)
	if (currentDir === undefined) return

	const pushCurrentDirs = useAppStore((state) => state.pushCurrentDirs)
	const jumpCurrentDirs = useAppStore((state) => state.jumpCurrentDirs)
	const isInTrash = useAppStore((state) => state.isInTrash)
	const setIsInTrash = useAppStore((state) => state.setIsInTrash)

	const filesGetter = useRequest(getFiles, { manual: true })
	const navigate = useNavigate()
	const [files, setFiles] = useState<DriveFile[]>([])
	const getFilesIter = useRef<AsyncGenerator | undefined>(undefined)
	const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)
	const loadMoreRef = useRef<HTMLDivElement | null>(null)
	const [isLoadMoreInViewport] = useInViewport(loadMoreRef)

	const canLoadMore: boolean = nextPageToken !== undefined && !filesGetter.loading

	const getFilesIterator = async function* () {
		let pageToken: string | undefined = undefined
		setFiles([])
		setNextPageToken(undefined)
		do {
			const result = await filesGetter.runAsync(currentAccount, {
				dirId: currentDir.dirId,
				trashed: isInTrash,
				fields: 'files(id,name,mimeType,size,description,imageMediaMetadata(width,height),videoMediaMetadata(width,height,durationMillis)),nextPageToken',
				pageToken
			})
			pageToken = result.data.nextPageToken ?? undefined
			setNextPageToken(pageToken)
			if (result.data.files === undefined) return
			const pushedFiles: DriveFile[] = result.data.files
			setFiles((files) => [...files, ...pushedFiles])
			yield
		} while (pageToken != null)
	}

	const handleFileDoubleClick = (file: DriveFile): void => {
		if (file.mimeType === DRIVE_DIR_MIME_TYPE) {
			if (isInTrash) return
			if (file.id == null || file.name == null) return
			pushCurrentDirs({
				dirId: file.id,
				dirName: file.name
			})
		}
	}

	const handleGoParentDoubleClick = (): void => {
		const dir: Dir | undefined = currentDirs.at(-2)
		if (dir === undefined) {
			navigate(-1)
		} else {
			jumpCurrentDirs(dir.dirId)
		}
	}

	useEffect(() => {
		getFilesIter.current = getFilesIterator()
		getFilesIter.current.next()
	}, [currentDir.dirId, isInTrash])

	useEffect(() => {
		if (!isLoadMoreInViewport) return
		if (!canLoadMore) return
		getFilesIter.current?.next()
	}, [isLoadMoreInViewport])

	useUpdateEffect(() => {
		jumpCurrentDirs('root')
		if (!isInTrash && currentAccount.mainDirId) {
			pushCurrentDirs({
				dirId: currentAccount.mainDirId,
				dirName: emailName
			})
		}
	}, [isInTrash])

	return (
		<div className="flex-1 flex overflow-hidden">
			<div className="w-64">
				<List dense disablePadding subheader>
					<ListSubheader className="!leading-9">Ổ đĩa</ListSubheader>

					<ListItemButton selected={!isInTrash} onClick={() => setIsInTrash(false)}>
						<ListItemIcon>
							<HomeRounded />
						</ListItemIcon>
						Ổ đĩa chính
					</ListItemButton>

					<ListItemButton selected={isInTrash} onClick={() => setIsInTrash(true)}>
						<ListItemIcon>
							<DeleteRounded />
						</ListItemIcon>
						Thùng rác
					</ListItemButton>
				</List>
			</div>

			<Divider orientation="vertical" />

			<div key={currentDir.dirId} className="flex-1 overflow-auto">
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell>STT</TableCell>
							<TableCell width="50%">Tên</TableCell>
							<TableCell width="12%">Dung lượng</TableCell>
							<TableCell width="16%">Loại</TableCell>
							<TableCell width="8%">Thời lượng</TableCell>
							<TableCell width="14%">Kích cỡ</TableCell>
						</TableRow>
					</TableHead>

					<TableBody className="select-none cursor-default">
						<TableRow hover>
							<TableCell colSpan={6} onDoubleClick={handleGoParentDoubleClick}>
								...
							</TableCell>
						</TableRow>

						{files?.map((file, index) => (
							<TableRow
								key={file.id}
								hover
								onDoubleClick={() => handleFileDoubleClick(file)}
							>
								<TableCell className="!text-zinc-400">{index + 1}</TableCell>

								<TableCell>
									<div className="pr-16 line-clamp-1">
										{file.description || file.name}
									</div>
								</TableCell>

								<TableCell className="!text-zinc-400">
									{formatSize(file.size)}
								</TableCell>

								<TableCell className="!text-zinc-400">
									{file.mimeType !== DRIVE_DIR_MIME_TYPE && file.mimeType}
								</TableCell>

								<TableCell className="!text-zinc-400">
									{file.videoMediaMetadata != null && (
										<>
											{formatVideoDuration(
												file.videoMediaMetadata.durationMillis
											)}
										</>
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
						))}
					</TableBody>
				</Table>

				{(filesGetter.loading || nextPageToken !== undefined) && (
					<div ref={loadMoreRef} className="py-2 text-center text-zinc-400">
						Đang tải...
					</div>
				)}

				{files.length === 0 && !filesGetter.loading && (
					<div className="py-2 text-center text-zinc-500">Thư mục trống</div>
				)}
			</div>
		</div>
	)
}

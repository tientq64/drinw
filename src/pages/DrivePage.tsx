import { CreateNewFolderRounded } from '@mui/icons-material'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useInViewport, useRequest } from 'ahooks'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { ContextMenu } from '../components/ContextMenu'
import { FileItem } from '../components/FileItem'
import { DRIVE_DIR_MIME_TYPE } from '../constants/constants'
import { FilesViewModeEnum } from '../constants/filesViewModes'
import { getAccountClientEmailName } from '../helpers/getAccountClientEmailName'
import { getFiles } from '../helpers/getFiles'
import { DriveFile } from '../helpers/getGoogleDrive'
import { Dir, useAppStore } from '../store/useAppStore'

export function DrivePage(): ReactNode {
	const currentAccount = useAppStore((state) => state.currentAccount)
	if (currentAccount === undefined) {
		return <Navigate to="/accounts" replace />
	}

	const emailName: string = getAccountClientEmailName(currentAccount)

	const currentDirs = useAppStore((state) => state.currentDirs)
	const currentDir: Dir | undefined = currentDirs.at(-1)
	if (currentDir === undefined) return

	const pushCurrentDirs = useAppStore((state) => state.pushCurrentDirs)
	const jumpCurrentDirs = useAppStore((state) => state.jumpCurrentDirs)
	const isInTrash = useAppStore((state) => state.isInTrash)
	const filesViewMode = useAppStore((state) => state.filesViewMode)

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
				fields: 'files(id,name,mimeType,size,description,thumbnailLink,imageMediaMetadata(width,height),videoMediaMetadata(width,height,durationMillis)),nextPageToken',
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
			navigate('/accounts')
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

	useEffect(() => {
		if (isInTrash) {
			jumpCurrentDirs('root')
		} else {
			if (currentDir.dirId === 'root' && currentAccount.mainDirId) {
				pushCurrentDirs({
					dirId: currentAccount.mainDirId,
					dirName: emailName
				})
			}
		}
	}, [isInTrash])

	return (
		<ContextMenu
			menuItems={[
				{
					title: 'Thư mục mới',
					icon: <CreateNewFolderRounded />
				}
			]}
		>
			<div key={currentDir.dirId} className="flex-1 h-full overflow-auto">
				{filesViewMode === FilesViewModeEnum.List && (
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

							{files.map((file, index) => (
								<FileItem
									key={file.id}
									file={file}
									index={index}
									viewMode={filesViewMode}
									account={currentAccount}
									onFileDoubleClick={handleFileDoubleClick}
								/>
							))}
						</TableBody>
					</Table>
				)}

				{filesViewMode === FilesViewModeEnum.Grid && (
					<div className="grid grid-cols-8 gap-3 p-4">
						{files.map((file, index) => (
							<FileItem
								key={file.id}
								file={file}
								index={index}
								viewMode={filesViewMode}
								account={currentAccount}
								onFileDoubleClick={handleFileDoubleClick}
							/>
						))}
					</div>
				)}

				{(filesGetter.loading || nextPageToken !== undefined) && (
					<div ref={loadMoreRef} className="py-2 text-center text-zinc-400">
						Đang tải...
					</div>
				)}

				{files.length === 0 && !filesGetter.loading && (
					<div className="py-2 text-center text-zinc-500">Thư mục trống</div>
				)}
			</div>
		</ContextMenu>
	)
}

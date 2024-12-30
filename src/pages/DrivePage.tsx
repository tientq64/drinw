import {
	CloudUploadRounded,
	CreateNewFolderRounded,
	DeleteForeverRounded,
	DeleteRounded,
	InfoRounded,
	RefreshRounded,
	StorageRounded,
	UploadFileRounded
} from '@mui/icons-material'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useInViewport, useRequest } from 'ahooks'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { ContextMenu, ContextMenuItem } from '../components/ContextMenu'
import { FileItem } from '../components/FileItem'
import { DRIVE_DIR_MIME_TYPE } from '../constants/constants'
import { FilesViewModeEnum } from '../constants/filesViewModes'
import { getAccountClientEmailName } from '../helpers/getAccountClientEmailName'
import { getFiles } from '../helpers/getFiles'
import { DriveFile } from '../helpers/getGoogleDrive'
import { useUploadViaUrlDialog } from '../hooks/useUploadViaUrlDialog'
import { jumpCurrentDirs } from '../store/jumpCurrentDirs'
import { pushCurrentDirs } from '../store/pushCurrentDirs'
import { setIsInTrash } from '../store/setIsInTrash'
import { Dir } from '../store/types'
import { useAppStore } from '../store/useAppStore'

export function DrivePage(): ReactNode {
	const currentAccount = useAppStore((state) => state.currentAccount)
	if (currentAccount === undefined) {
		return <Navigate to="/accounts" replace />
	}

	const emailName: string = getAccountClientEmailName(currentAccount)

	const currentDirs = useAppStore((state) => state.currentDirs)
	const currentDir: Dir | undefined = currentDirs.at(-1)
	if (currentDir === undefined) return

	const isInTrash = useAppStore((state) => state.isInTrash)
	const filesViewMode = useAppStore((state) => state.filesViewMode)

	const filesGetter = useRequest(getFiles, { manual: true })
	const navigate = useNavigate()
	const [files, setFiles] = useState<DriveFile[]>([])
	const getFilesIter = useRef<AsyncGenerator | undefined>(undefined)
	const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)
	const loadMoreRef = useRef<HTMLDivElement | null>(null)
	const [isLoadMoreInViewport] = useInViewport(loadMoreRef)
	const uploadViaUrlDialog = useUploadViaUrlDialog()

	const canLoadMore: boolean = nextPageToken !== undefined && !filesGetter.loading

	const loadFiles = () => {
		getFilesIter.current = getFilesIterator()
		getFilesIter.current.next()
	}

	const getFilesIterator = async function* () {
		let pageToken: string | undefined = undefined
		setFiles([])
		setNextPageToken(undefined)
		do {
			const result = await filesGetter.runAsync(currentAccount, {
				dirId: currentDir.dirId,
				trashed: isInTrash,
				fields: 'files(id,name,mimeType,size,description,thumbnailLink,webViewLink,imageMediaMetadata(width,height),videoMediaMetadata(width,height,durationMillis)),nextPageToken',
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

	const driveContextMenuItems: ContextMenuItem[] = [
		{
			title: 'Làm mới',
			icon: <RefreshRounded />,
			click: loadFiles
		},
		{
			divider: true
		},
		{
			title: 'Tải lên tập tin',
			icon: <UploadFileRounded />
		},
		{
			title: 'Tải lên thông qua URL',
			icon: <CloudUploadRounded />,
			click: () => {
				uploadViaUrlDialog.open(currentAccount, currentDir.dirId)
			}
		},
		{
			divider: true
		},
		{
			title: 'Thư mục mới',
			icon: <CreateNewFolderRounded />
		},
		{
			divider: true
		},
		{
			title: 'Đi đến thùng rác',
			icon: <DeleteRounded />,
			click: () => setIsInTrash(true)
		},
		{
			divider: true
		},
		{
			title: 'Thông tin thư mục này',
			icon: <InfoRounded />
		}
	]

	const trashContextMenuItems: ContextMenuItem[] = [
		{
			title: 'Đi đến ổ đĩa chính',
			icon: <StorageRounded />,
			click: () => setIsInTrash(false)
		},
		{
			title: 'Xóa tất cả trong thùng rác',
			icon: <DeleteForeverRounded />,
			color: 'red'
		},
		{
			divider: true
		},
		{
			title: 'Thông tin thùng rác',
			icon: <InfoRounded />
		}
	]

	useEffect(() => {
		loadFiles()
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
		<>
			<ContextMenu menuItems={isInTrash ? trashContextMenuItems : driveContextMenuItems}>
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
									<TableCell
										colSpan={6}
										onDoubleClick={handleGoParentDoubleClick}
									>
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
						<div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-3 p-4">
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

			{uploadViaUrlDialog.dialog}
		</>
	)
}

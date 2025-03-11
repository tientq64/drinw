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
import { useInViewport, useRequest, useUpdateEffect } from 'ahooks'
import { nanoid } from 'nanoid'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { createDir } from '../api/createDir'
import { getFiles } from '../api/getFiles'
import { ContextMenu, ContextMenuItem } from '../components/ContextMenu'
import { FileItem } from '../components/FileItem'
import { DRIVE_DIR_MIME_TYPE, FILE_FIELDS } from '../constants/constants'
import { FilesViewModeEnum } from '../constants/filesViewModes'
import { dirNameSchema } from '../constants/validationSchemas'
import { getAccountClientEmailName } from '../helpers/getAccountClientEmailName'
import { DriveFile } from '../helpers/getGoogleDrive'
import { usePrompt } from '../hooks/usePrompt'
import { useUploadViaUrlDialog } from '../hooks/useUploadViaUrlDialog'
import { addBreadcrumbItem } from '../store/addBreadcrumbItem'
import { jumpToBreadcrumbItem } from '../store/jumpToBreadcrumbItem'
import { setIsInTrash } from '../store/setIsInTrash'
import { BreadcrumbItem } from '../store/types'
import { useAppStore } from '../store/useAppStore'

export function DrivePage(): ReactNode {
	const currentAccount = useAppStore((state) => state.currentAccount)
	if (currentAccount === undefined) {
		return <Navigate to="/accounts" replace />
	}

	const emailName: string = getAccountClientEmailName(currentAccount)

	const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)
	const currentBreadcrumbItem: BreadcrumbItem | undefined = breadcrumbItems.at(-1)
	if (currentBreadcrumbItem === undefined) return

	const isInTrash = useAppStore((state) => state.isInTrash)
	const filesViewMode = useAppStore((state) => state.filesViewMode)

	const getFilesApi = useRequest(getFiles, { manual: true })
	const navigate = useNavigate()
	const [files, setFiles] = useState<DriveFile[]>([])
	const filesIterator = useRef<AsyncGenerator | undefined>(undefined)
	const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)
	const loadMoreRef = useRef<HTMLDivElement | null>(null)
	const [isLoadMoreInViewport] = useInViewport(loadMoreRef)
	const uploadViaUrlDialog = useUploadViaUrlDialog()
	const createDirPrompt = usePrompt()
	const createDirApi = useRequest(createDir, { manual: true })
	const { randomId } = useParams()

	const canLoadMore: boolean = nextPageToken !== undefined && !getFilesApi.loading

	const loadFiles = () => {
		filesIterator.current = getFilesIterator()
		filesIterator.current.next()
	}

	const getFilesIterator = async function* () {
		let pageToken: string | undefined = undefined
		setFiles([])
		setNextPageToken(undefined)
		do {
			const result = await getFilesApi.runAsync(currentAccount, {
				dirId: currentBreadcrumbItem.dirId,
				trashed: isInTrash,
				fields: `files(${FILE_FIELDS}),nextPageToken`,
				orderBy: 'folder,createdTime desc',
				pageSize: 100,
				pageToken
			})
			pageToken = result.data.nextPageToken ?? undefined
			setNextPageToken(pageToken)
			if (result.data.files === undefined) return
			const pushedFiles: DriveFile[] = result.data.files
			setFiles((files) => [...files, ...pushedFiles])
			yield
		} while (pageToken !== undefined)
	}

	const checkFileBelongsToCurrentFiles = (file: DriveFile): boolean => {
		if (file.parents == null) {
			return false
		}
		return file.parents.includes(currentBreadcrumbItem.dirId)
	}

	const addFileToFiles = (...addedFiles: DriveFile[]): void => {
		const file: DriveFile | undefined = addedFiles.at(0)
		if (file === undefined) return
		if (file.trashed !== isInTrash) return
		if (!checkFileBelongsToCurrentFiles(file)) return
		setFiles((files) => {
			return getSortedFiles([...files, ...addedFiles])
		})
	}

	const getSortedFiles = (unsortedFiles: DriveFile[]): DriveFile[] => {
		const sortedFiles: DriveFile[] = unsortedFiles.toSorted((fileA, fileB) => {
			const isDirA: boolean = fileA.mimeType === DRIVE_DIR_MIME_TYPE
			const isDirB: boolean = fileB.mimeType === DRIVE_DIR_MIME_TYPE
			if (isDirA !== isDirB) {
				return isDirA ? -1 : 1
			}
			const dateA: Date = new Date(fileA.createdTime ?? 0)
			const dateB: Date = new Date(fileB.createdTime ?? 0)
			return Number(dateB) - Number(dateA)
		})
		return sortedFiles
	}

	const handleFileDoubleClick = (file: DriveFile): void => {
		if (file.mimeType === DRIVE_DIR_MIME_TYPE) {
			if (isInTrash) return
			if (file.id == null || file.name == null) return
			addBreadcrumbItem({
				dirId: file.id,
				dirName: file.name
			})
		}
	}

	const handleGoParentDoubleClick = (): void => {
		const dir: BreadcrumbItem | undefined = breadcrumbItems.at(-2)
		if (dir === undefined) {
			navigate('/accounts')
		} else {
			jumpToBreadcrumbItem(dir.dirId)
		}
	}

	const handleCreateNewDir = async (): Promise<void> => {
		const newDirName: string | null = await createDirPrompt.open(
			'Tên thư mục mới',
			'',
			dirNameSchema
		)
		if (newDirName === null) return
		createDirApi.runAsync(currentAccount, newDirName, currentBreadcrumbItem.dirId)
	}

	const driveContextMenuItems: ContextMenuItem[] = [
		{
			title: 'Làm mới',
			icon: <RefreshRounded />,
			click: () => {
				navigate('/drive/' + nanoid())
			}
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
				uploadViaUrlDialog.open(currentAccount, currentBreadcrumbItem.dirId)
			}
		},
		{
			divider: true
		},
		{
			title: 'Thư mục mới',
			icon: <CreateNewFolderRounded />,
			click: handleCreateNewDir
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
	}, [currentBreadcrumbItem.dirId, isInTrash])

	useEffect(() => {
		if (!isLoadMoreInViewport) return
		if (!canLoadMore) return
		filesIterator.current?.next()
	}, [isLoadMoreInViewport])

	useEffect(() => {
		if (randomId !== undefined) return
		if (isInTrash) {
			jumpToBreadcrumbItem('root')
		} else {
			if (currentBreadcrumbItem.dirId === 'root' && currentAccount.mainDirId) {
				addBreadcrumbItem({
					dirId: currentAccount.mainDirId,
					dirName: emailName
				})
			}
		}
	}, [isInTrash])

	useUpdateEffect(() => {
		const newDir: DriveFile | undefined = createDirApi.data
		if (newDir === undefined) return
		addFileToFiles(newDir)
	}, [createDirApi.data])

	useUpdateEffect(() => {
		navigate('/drive/' + nanoid(), { replace: true })
	}, [currentBreadcrumbItem.dirId])

	return (
		<>
			<ContextMenu menuItems={isInTrash ? trashContextMenuItems : driveContextMenuItems}>
				<div key={currentBreadcrumbItem.dirId} className="h-full flex-1 overflow-auto">
					{filesViewMode === FilesViewModeEnum.List && (
						<Table stickyHeader size="small">
							<TableHead>
								<TableRow>
									<TableCell>STT</TableCell>
									<TableCell width="50%">Tên</TableCell>
									<TableCell width="12%">Dung lượng</TableCell>
									<TableCell width="16%">Loại</TableCell>
									<TableCell width="9%">Thời lượng</TableCell>
									<TableCell width="13%">Kích cỡ</TableCell>
								</TableRow>
							</TableHead>

							<TableBody className="cursor-default select-none">
								<TableRow className="truncate" hover>
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

					{(getFilesApi.loading || nextPageToken !== undefined) && (
						<div ref={loadMoreRef} className="py-2 text-center text-zinc-400">
							Đang tải...
						</div>
					)}

					{files.length === 0 && !getFilesApi.loading && (
						<div className="py-2 text-center text-zinc-500">Thư mục trống</div>
					)}
				</div>
			</ContextMenu>

			{createDirPrompt.dialog}
			{uploadViaUrlDialog.dialog}
		</>
	)
}

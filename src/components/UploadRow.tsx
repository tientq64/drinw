import { CircularProgress, Divider, ListItemAvatar, ListItemButton } from '@mui/material'
import { WritableDraft } from 'immer'
import { ReactNode, useEffect, useMemo } from 'react'
import { SubprocessPromise } from 'tinyspawn'
import { Payload, youtubeDl } from 'youtube-dl-exec'
import { AccountKind, findAccountKind } from '../constants/accountKinds'
import { getUploadStatus, UploadStatusEnum } from '../constants/uploadStatuses'
import { setUploadItemFailed } from '../store/setUploadItemFailed'
import { UploadItem } from '../store/types'
import { updateUploadItem } from '../store/updateUploadItem'
import { formatSize } from '../utils/formatSize'
import { ErrorRounded } from '@mui/icons-material'
import { getUploadItemTempDownloadPath } from '../helpers/getUploadItemTempDownloadPath'

interface UploadRowProps {
	uploadItem: UploadItem
	index?: number
}

export function UploadRow({ uploadItem, index = 0 }: UploadRowProps): ReactNode {
	const kind = useMemo<AccountKind | undefined>(() => {
		if (uploadItem.kindName === undefined) {
			return undefined
		}
		return findAccountKind(uploadItem.kindName)
	}, [uploadItem.kindName])

	const update = (
		partial: Partial<UploadItem> | ((draft: WritableDraft<UploadItem>) => void)
	): void => {
		updateUploadItem(uploadItem.id, partial)
	}

	const setFailed = (anyReason: string | Error | unknown): void => {
		setUploadItemFailed(uploadItem.id, anyReason)
	}

	const handleFetchingMetadata = async (): Promise<void> => {
		if (uploadItem.sourceUrl) {
			let data: Payload | string
			try {
				data = await youtubeDl(uploadItem.sourceUrl, {
					dumpSingleJson: true,
					format: 'bv*+ba/b'
				})
				if (typeof data === 'string') {
					throw Error('Siêu dữ liệu trả về chuỗi')
				}
			} catch (error) {
				setFailed(error)
				throw error
			}
			const kind: AccountKind | undefined = findAccountKind(data.extractor_key)
			update({
				status: UploadStatusEnum.FetchedMetadata,
				fileId: data.id,
				fileExt: data.ext,
				fileSize: (data as any).filesize ?? data.filesize_approx,
				fileResolution: data.resolution,
				kindName: kind?.name,
				thumbnailUrl: data.thumbnail,
				title: data.title,
				userId: data.uploader_id,
				userName: data.uploader
			})
		}
	}

	const handleDownloading = (): void => {
		if (uploadItem.sourceUrl) {
			let skippedUpdateProgressSize: boolean = false
			update({
				progressSize: 0
			})
			let proc: SubprocessPromise
			try {
				proc = youtubeDl.exec(uploadItem.sourceUrl, {
					format: 'bv*+ba/b',
					output: getUploadItemTempDownloadPath(uploadItem)
				})
				if (proc.stdout === null) {
					throw Error('Process không có stdout')
				}
			} catch (error) {
				setFailed(error)
				throw error
			}
			proc.stdout.on('data', (chunk) => {
				if (skippedUpdateProgressSize) return
				if (uploadItem.fileSize === undefined) return

				const infosText: string = Buffer.from(chunk).toString('utf8').trim()
				const infosChunk: string[] = infosText.split(/\s+/, 2).filter(Boolean)
				if (infosChunk[0] !== '[download]') return

				let progress: number = parseFloat(infosChunk[1]) / 100
				if (infosText.includes('has already been downloaded')) {
					progress = 1
				}
				if (progress === 1) {
					skippedUpdateProgressSize = true
				} else if (isNaN(progress)) {
					return
				}
				update({
					progressSize: Math.floor(progress * uploadItem.fileSize)
				})
			})
		}
	}

	useEffect(() => {
		switch (uploadItem.status) {
			case UploadStatusEnum.FetchingMetadata:
				handleFetchingMetadata()
				break

			case UploadStatusEnum.Downloading:
				handleDownloading()
				break
		}
	}, [uploadItem.status])

	return (
		<>
			{index > 0 && <Divider variant="inset" />}

			<ListItemButton className="text-sm" dense disableRipple>
				<ListItemAvatar className="flex items-center">
					{uploadItem.status === UploadStatusEnum.FetchingMetadata && (
						<CircularProgress className="!text-zinc-600" size={32} thickness={22} />
					)}
					{uploadItem.status === UploadStatusEnum.Downloading && (
						<CircularProgress
							className="!text-amber-500"
							variant={
								uploadItem.fileSize === undefined ? 'indeterminate' : 'determinate'
							}
							size={32}
							thickness={22}
							value={(uploadItem.progressSize / (uploadItem.fileSize ?? 1)) * 100}
						/>
					)}
					{uploadItem.status === UploadStatusEnum.Failed && (
						<ErrorRounded className="text-rose-400" fontSize="large" />
					)}
				</ListItemAvatar>

				<div className="flex-1 min-w-0">
					<div className="truncate">{uploadItem.sourceUrl}</div>

					<div className="flex items-center gap-2 text-zinc-400/70">
						{getUploadStatus(uploadItem.status).text}

						{uploadItem.status !== UploadStatusEnum.Failed && (
							<>
								{uploadItem.fileSize !== undefined && (
									<>
										<Divider className="!h-4" orientation="vertical" />
										{formatSize(uploadItem.fileSize)}
									</>
								)}

								{uploadItem.fileResolution !== undefined && (
									<>
										<Divider className="!h-4" orientation="vertical" />
										{uploadItem.fileResolution}
									</>
								)}
							</>
						)}
						{uploadItem.status === UploadStatusEnum.Failed && (
							<>
								<Divider className="!h-4" orientation="vertical" />
								<div className="truncate">{uploadItem.failedReason}</div>
							</>
						)}
					</div>
				</div>
			</ListItemButton>
		</>
	)
}

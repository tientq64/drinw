import clsx from 'clsx'
import { ReactNode, useMemo } from 'react'
import { getUploadStatus, UploadStatusEnum } from '../constants/uploadStatuses'
import { filterFinishedSubItems } from '../helpers/filterFinishedSubItems'
import { UploadItem } from '../helpers/makeUploadItem'
import { useUploadItemMenu } from '../hooks/useUploadItemMenu'
import { useAppStore } from '../store/useAppStore'
import { formatSize } from '../utils/formatSize'
import { ContextMenu } from './ContextMenu'
import { UploadItemStatus } from './UploadItemStatus'

interface UploadItemRowProps {
    uploadItem: UploadItem
}

export function UploadItemRow({ uploadItem }: UploadItemRowProps): ReactNode {
    const uploadItems = useAppStore((state) => state.uploadItems)

    const uploadItemMenu = useUploadItemMenu(uploadItem)

    const statusName: UploadStatusEnum = uploadItem.statusName
    const isRootDirUploadItem: boolean =
        uploadItem.localDirPath !== undefined && !uploadItem.isSubItem

    const finishedAllSubItems = useMemo<UploadItem[]>(() => {
        return filterFinishedSubItems(uploadItems, uploadItem.allSubItemIds)
    }, [uploadItems, uploadItem.allSubItemIds])

    return (
        <ContextMenu openClassName="bg-zinc-800" items={uploadItemMenu.items}>
            <div
                className={clsx(
                    'flex cursor-default items-center gap-2 px-2 py-1',
                    uploadItem.isSubItem && 'border-l-8 border-zinc-700/40'
                )}
            >
                <UploadItemStatus uploadItem={uploadItem} />

                <div className="min-w-0 flex-1">
                    <div
                        className={clsx(
                            'truncate',
                            uploadItem.localDirPath !== undefined && 'text-orange-300'
                        )}
                    >
                        {uploadItem.fileName ?? uploadItem.pageUrl ?? '---'}
                    </div>

                    <div className="flex gap-2 text-xs text-zinc-500">
                        <div className="empty:hidden">
                            {statusName === UploadStatusEnum.Downloading && (
                                <>
                                    {formatSize(uploadItem.progress, 0)}
                                    {' / '}
                                    {formatSize(uploadItem.totalProgress)}
                                </>
                            )}

                            {statusName === UploadStatusEnum.Uploading && (
                                <>
                                    {formatSize(uploadItem.progress, 0)}
                                    {' / '}
                                    {formatSize(uploadItem.totalProgress)}
                                </>
                            )}

                            {statusName === UploadStatusEnum.Success && (
                                <>{formatSize(uploadItem.fileSize)}</>
                            )}
                        </div>

                        <div className="flex-1 truncate">
                            {uploadItem.message || getUploadStatus(statusName).message || '\xa0'}
                        </div>

                        <div className="empty:hidden">
                            {isRootDirUploadItem && (
                                <>
                                    {statusName === UploadStatusEnum.Preload && (
                                        <>{uploadItem.progress} mục</>
                                    )}

                                    {uploadItem.allSubItemIds.length > 0 && (
                                        <>
                                            {finishedAllSubItems.length}
                                            {' / '}
                                            {uploadItem.allSubItemIds.length} mục
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ContextMenu>
    )
}

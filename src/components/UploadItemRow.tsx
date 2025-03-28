import { ReactNode } from 'react'
import { getUploadStatus, UploadStatusEnum } from '../constants/uploadStatuses'
import { useUploadItemMenu } from '../hooks/useUploadItemMenu'
import { UploadItem } from '../store/types'
import { formatSize } from '../utils/formatSize'
import { ContextMenu } from './ContextMenu'
import { UploadItemStatus } from './UploadItemStatus'

interface UploadItemRowProps {
    uploadItem: UploadItem
}

export function UploadItemRow({ uploadItem }: UploadItemRowProps): ReactNode {
    const uploadItemMenu = useUploadItemMenu(uploadItem)

    return (
        <ContextMenu openClassName="bg-zinc-800" items={uploadItemMenu.items}>
            <div className="flex cursor-default items-center gap-2 px-2 py-1">
                <UploadItemStatus uploadItem={uploadItem} />

                <div className="min-w-0 flex-1">
                    <div className="truncate">{uploadItem.fileName ?? uploadItem.pageUrl}</div>

                    <div className="flex gap-2 text-xs text-zinc-500">
                        {uploadItem.statusName === UploadStatusEnum.Downloading && (
                            <div>
                                {formatSize(uploadItem.progress, 0)}
                                {' / '}
                                {formatSize(uploadItem.totalProgress)}
                            </div>
                        )}

                        {uploadItem.statusName === UploadStatusEnum.Uploading && (
                            <div>
                                {formatSize(uploadItem.progress, 0)}
                                {' / '}
                                {formatSize(uploadItem.totalProgress)}
                            </div>
                        )}

                        {uploadItem.statusName === UploadStatusEnum.Success && (
                            <div className="truncate">{formatSize(uploadItem.fileSize)}</div>
                        )}

                        <div className="flex-1 truncate">
                            {uploadItem.message || getUploadStatus(uploadItem.statusName).message}
                        </div>
                    </div>
                </div>
            </div>
        </ContextMenu>
    )
}

import { ReactNode } from 'react'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { useHandleUploadItemDownloading } from '../hooks/useHandleUploadItemDownloading'
import { useHandleUploadItemPreload } from '../hooks/useHandleUploadItemPreload'
import { useHandleUploadItemSuccess } from '../hooks/useHandleUploadItemSuccess'
import { useHandleUploadItemUploading } from '../hooks/useHandleUploadItemUploading'
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

    useHandleUploadItemPreload(uploadItem)
    useHandleUploadItemDownloading(uploadItem)
    useHandleUploadItemUploading(uploadItem)
    useHandleUploadItemSuccess(uploadItem)

    return (
        <ContextMenu openClassName="bg-zinc-800" items={uploadItemMenu.items}>
            <div className="flex cursor-default items-center gap-2 px-2 py-1">
                <UploadItemStatus uploadItem={uploadItem} />

                <div className="min-w-0 flex-1">
                    <div className="truncate">{uploadItem.fileName ?? uploadItem.pageUrl}</div>

                    <div className="flex gap-2 text-xs text-zinc-500">
                        <div className="truncate">{uploadItem.statusName}</div>

                        {uploadItem.statusName === UploadStatusEnum.Preload && (
                            <div className="truncate">Đang lấy thông tin tệp</div>
                        )}

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

                        {uploadItem.statusName === UploadStatusEnum.Failed && (
                            <div className="truncate">{uploadItem.failureReason}</div>
                        )}
                    </div>
                </div>
            </div>
        </ContextMenu>
    )
}

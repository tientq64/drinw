import { Spin } from 'antd'
import { ReactNode } from 'react'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../store/types'
import { Icon } from './Icon'

interface UploadItemStatusProps {
    uploadItem: UploadItem
}

export function UploadItemStatus({ uploadItem }: UploadItemStatusProps): ReactNode {
    const percent: number = (uploadItem.progress / (uploadItem.totalProgress || 1)) * 100 || 1

    return (
        <div className="flex w-8 items-center justify-center">
            {uploadItem.statusName === UploadStatusEnum.Preload && <Spin />}

            {uploadItem.statusName === UploadStatusEnum.Waiting && (
                <Icon className="text-slate-500" name="pending" />
            )}

            {uploadItem.statusName === UploadStatusEnum.Downloading && <Spin percent={percent} />}

            {uploadItem.statusName === UploadStatusEnum.Uploading && <Spin percent={percent} />}

            {uploadItem.statusName === UploadStatusEnum.Success && (
                <Icon className="text-green-500" name="check_circle" />
            )}

            {uploadItem.statusName === UploadStatusEnum.Failed && (
                <Icon className="text-rose-500" name="error" />
            )}
        </div>
    )
}

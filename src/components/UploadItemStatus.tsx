import { Spin } from 'antd'
import { ReactNode } from 'react'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { UploadItem } from '../helpers/makeUploadItem'
import { Icon } from './Icon'

interface UploadItemStatusProps {
    uploadItem: UploadItem
}

export function UploadItemStatus({ uploadItem }: UploadItemStatusProps): ReactNode {
    const statusName: UploadStatusEnum = uploadItem.statusName
    const percent: number = (uploadItem.progress / (uploadItem.totalProgress || 1)) * 100 || 1

    return (
        <div className="flex w-8 items-center justify-center">
            {statusName === UploadStatusEnum.Preload && <Spin />}

            {statusName === UploadStatusEnum.Waiting && (
                <Icon className="text-slate-500" name="pending" />
            )}

            {statusName === UploadStatusEnum.Downloading && <Spin percent={percent} />}

            {statusName === UploadStatusEnum.Uploading && <Spin percent={percent} />}

            {statusName === UploadStatusEnum.Success && (
                <Icon className="text-green-500" name="check-circle" />
            )}

            {statusName === UploadStatusEnum.Failed && (
                <Icon className="text-rose-500" name="error" />
            )}
        </div>
    )
}

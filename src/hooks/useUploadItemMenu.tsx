import { ItemType } from 'antd/es/menu/interface'
import { useMemo } from 'react'
import { Icon } from '../components/Icon'
import { formatMenuItems } from '../helpers/formatMenuItems'
import { isLocalPathUploadItem } from '../helpers/isLocalPathUploadItem'
import { UploadItem } from '../helpers/makeUploadItem'
import { openWithBrowser } from '../helpers/openWithBrowser'
import { openWithFileManager } from '../helpers/openWithFileManager'

export function useUploadItemMenu(uploadItem: UploadItem) {
    const items = useMemo<ItemType[]>(() => {
        return formatMenuItems([
            uploadItem.pageUrl !== undefined && {
                key: 'open-page-url',
                label: 'Mở URL',
                icon: <Icon name="link" />,
                onClick: () => {
                    openWithBrowser(uploadItem.pageUrl)
                }
            },
            isLocalPathUploadItem(uploadItem) && {
                key: 'open-local-file',
                label: 'Mở trong trình quản lý tệp',
                icon: <Icon name="link" />,
                onClick: () => {
                    openWithFileManager(uploadItem.localDirPath ?? uploadItem.localFilePath)
                }
            },
            {
                type: 'divider'
            },
            {
                key: 'pause',
                label: 'Tạm dừng tải lên',
                icon: <Icon name="pause" />
            },
            {
                key: 'stop',
                label: 'Hủy tải lên',
                icon: <Icon name="stop" />
            }
        ])
    }, [uploadItem])

    return { items }
}

import { ItemType } from 'antd/es/menu/interface'
import { useMemo } from 'react'
import { Icon } from '../components/Icon'
import { openWithBrowser } from '../helpers/openWithBrowser'
import { UploadItem } from '../helpers/makeUploadItem'

export function useUploadItemMenu(uploadItem: UploadItem) {
    const items = useMemo<ItemType[]>(() => {
        return [
            {
                key: 'open-page-url',
                label: 'Mở URL',
                icon: <Icon name="link" />,
                disabled: uploadItem.pageUrl === undefined,
                onClick: () => {
                    openWithBrowser(uploadItem.pageUrl)
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
        ]
    }, [uploadItem])

    return { items }
}

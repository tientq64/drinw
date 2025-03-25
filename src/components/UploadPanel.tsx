import { useUpdateEffect } from 'ahooks'
import { Table } from 'antd'
import { ReactNode, useMemo } from 'react'
import { filterPendingItems } from '../helpers/filterPendingItems'
import { tryStartUploadFromQueue } from '../helpers/tryStartUploadFromQueue'
import { useWindowContentSize } from '../hooks/useWindowContentSize'
import { UploadItem } from '../store/types'
import { useAppStore } from '../store/useAppStore'
import { headerBarHeight } from './HeaderBar'
import { UploadItemRow } from './UploadItemRow'

export function UploadPanel(): ReactNode {
    const uploadItems = useAppStore((state) => state.uploadItems)
    const windowContentSize = useWindowContentSize()

    const pendingItems = useMemo<UploadItem[]>(() => {
        return filterPendingItems(uploadItems)
    }, [uploadItems])

    useUpdateEffect(() => {
        tryStartUploadFromQueue()
    }, [pendingItems.length])

    return (
        <div className="h-full overflow-hidden border-l border-zinc-700" style={{ width: 360 }}>
            <Table
                className="!h-min !overflow-hidden"
                size="small"
                virtual
                showHeader={false}
                pagination={false}
                scroll={{
                    y: windowContentSize.height - headerBarHeight
                }}
                rowKey="id"
                columns={[
                    {
                        className: '!p-0',
                        render: (_, uploadItem) => <UploadItemRow uploadItem={uploadItem} />
                    }
                ]}
                dataSource={uploadItems}
            />
        </div>
    )
}

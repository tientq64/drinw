import { Table } from 'antd'
import { ReactNode } from 'react'
import { useWindowContentSize } from '../hooks/useWindowContentSize'
import { useAppStore } from '../store/useAppStore'
import { headerBarHeight } from './HeaderBar'
import { UploadItemRow } from './UploadItemRow'

export function UploadPanel(): ReactNode {
    const uploadItems = useAppStore((state) => state.uploadItems)
    const windowContentSize = useWindowContentSize()

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
                locale={{
                    emptyText: 'Không có tệp nào đang tải lên'
                }}
            />
        </div>
    )
}

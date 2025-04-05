import { Table } from 'antd'
import { ReactNode, useMemo } from 'react'
import { AutoSizer } from 'react-virtualized'
import { UploadItem } from '../helpers/makeUploadItem'
import { useAppStore } from '../store/useAppStore'
import { UploadItemRow } from './UploadItemRow'

export function UploadPanel(): ReactNode {
    const uploadItems = useAppStore((state) => state.uploadItems)

    // TODO:
    const visibleUploadItems = useMemo<UploadItem[]>(() => {
        return uploadItems
    }, [uploadItems])

    return (
        <div className="h-full overflow-hidden border-l border-zinc-700" style={{ width: 360 }}>
            <AutoSizer>
                {(size) => (
                    <Table
                        className="!h-min !overflow-hidden"
                        style={{
                            minWidth: size.width
                        }}
                        size="small"
                        virtual
                        showHeader={false}
                        pagination={false}
                        scroll={{
                            y: size.height
                        }}
                        rowKey="id"
                        columns={[
                            {
                                className: '!p-0',
                                render: (_, uploadItem) => <UploadItemRow uploadItem={uploadItem} />
                            }
                        ]}
                        dataSource={visibleUploadItems}
                        locale={{
                            emptyText: 'Không có tệp nào đang tải lên'
                        }}
                    />
                )}
            </AutoSizer>
        </div>
    )
}

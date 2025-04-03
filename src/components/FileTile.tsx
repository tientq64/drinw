import { Card, Descriptions, Popover } from 'antd'
import { DescriptionsItemType } from 'antd/es/descriptions'
import { CSSProperties, MouseEventHandler, ReactNode, useMemo } from 'react'
import { folderMime } from '../constants/constants'
import { File } from '../helpers/getGoogleDrive'
import { useFileMenu } from '../hooks/useFileMenu'
import { formatSize } from '../utils/formatSize'
import { ContextMenu } from './ContextMenu'
import { FileTileThumbnail } from './FileTileThumbnail'

interface FileTileProps {
    file: File
    style: CSSProperties
    onDoubleClick: MouseEventHandler
}

export function FileTile({ file, style, onDoubleClick }: FileTileProps): ReactNode {
    const fileMenu = useFileMenu(file)

    const detailsItems = useMemo<(DescriptionsItemType | boolean)[]>(() => {
        return [
            {
                label: 'Tên',
                children: file.description || file.name
            },
            {
                label: 'Loại',
                children: file.mimeType === folderMime ? 'Thư mục' : file.mimeType
            },
            file.size != null && {
                label: 'Dung lượng',
                children: formatSize(file.size)
            }
        ]
    }, [file])

    const formatedDetailsItems = useMemo<DescriptionsItemType[]>(() => {
        return detailsItems
            .filter((item) => {
                return typeof item === 'object'
            })
            .map((item) => {
                return { ...item, className: '!p-0' }
            })
    }, [detailsItems])

    return (
        <div className="p-1.5" style={style}>
            <ContextMenu
                openClassName="border-zinc-600 bg-zinc-800 pointer-events-none"
                items={fileMenu.items}
            >
                <Popover
                    rootClassName="max-w-96 pointer-events-none"
                    placement="rightBottom"
                    arrow={false}
                    mouseEnterDelay={0.5}
                    content={
                        <Descriptions
                            className="[&_.ant-descriptions-view_table]:w-auto"
                            column={1}
                            size="small"
                            items={formatedDetailsItems}
                        />
                    }
                >
                    <Card
                        className="h-full hover:border-zinc-600"
                        size="small"
                        hoverable
                        tabIndex={0}
                        onDoubleClick={onDoubleClick}
                        cover={<FileTileThumbnail file={file} />}
                    >
                        <Card.Meta
                            description={
                                <div className="line-clamp-2 break-words leading-snug text-zinc-300">
                                    {file.description || file.name}
                                </div>
                            }
                        />
                    </Card>
                </Popover>
            </ContextMenu>

            {fileMenu.modals}
        </div>
    )
}

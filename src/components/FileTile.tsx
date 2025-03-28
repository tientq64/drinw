import { Card, Descriptions, Popover } from 'antd'
import { CSSProperties, MouseEventHandler, ReactNode, useMemo } from 'react'
import { DriveFile } from '../helpers/getGoogleDrive'
import { useFileCellMenu } from '../hooks/useFileCellMenu'
import { Account } from '../store/types'
import { ContextMenu } from './ContextMenu'
import { FileTileThumbnail } from './FileTileThumbnail'
import { formatSize } from '../utils/formatSize'
import { folderMime } from '../constants/constants'
import { ItemType } from 'antd/es/menu/interface'
import { DescriptionsItemType } from 'antd/es/descriptions'

interface FileTileProps {
    file: DriveFile
    account: Account
    style: CSSProperties
    onDoubleClick: MouseEventHandler
}

export function FileTile({ file, account, style, onDoubleClick }: FileTileProps): ReactNode {
    const fileCellMenu = useFileCellMenu(file, account)

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
                items={fileCellMenu.items}
            >
                <Popover
                    rootClassName="max-w-96 pointer-events-none"
                    mouseEnterDelay={0.5}
                    arrow={false}
                    placement="rightBottom"
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
                        onDoubleClick={onDoubleClick}
                        cover={file.thumbnailLink && <FileTileThumbnail file={file} />}
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

            {fileCellMenu.modals}
        </div>
    )
}

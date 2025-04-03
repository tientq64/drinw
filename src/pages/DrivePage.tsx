import { useRequest } from 'ahooks'
import { Table } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import { AutoSizer, Grid, ScrollParams } from 'react-virtualized'
import { getFiles } from '../api/getFiles'
import { ContextMenu } from '../components/ContextMenu'
import { DriveDropper } from '../components/DriveDropper'
import { FileCell } from '../components/FileCell'
import { FileTile } from '../components/FileTile'
import { folderMime, rootDirId } from '../constants/constants'
import { getFileIconUrl } from '../constants/fileIconUrls'
import { ViewModeEnum } from '../constants/viewModes'
import { File } from '../helpers/getGoogleDrive'
import { useCurrentDir } from '../hooks/useCurrentDir'
import { useDriveNavigateToMainDir } from '../hooks/useDriveNavigateToMainDir'
import { useDrivePageMenu } from '../hooks/useDrivePageMenu'
import { useOpenFile } from '../hooks/useOpenFile'
import { useUpdateUsage } from '../hooks/useUpdateUsage'
import { useWindowContentSize } from '../hooks/useWindowContentSize'
import { setCurrentFiles } from '../store/setCurrentFiles'
import { useAppStore } from '../store/useAppStore'
import { formatSize } from '../utils/formatSize'

export function DrivePage(): ReactNode {
    const currentAccount = useAppStore((state) => state.currentAccount)
    if (currentAccount === undefined) return

    const currentDir = useCurrentDir()
    if (currentDir === undefined) return

    const inTrash = useAppStore((state) => state.inTrash)

    const currentFiles = useAppStore((state) => state.currentFiles)
    const viewModeName = useAppStore((state) => state.viewModeName)
    const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)

    const getFilesApi = useRequest(getFiles, { manual: true })
    const windowContentSize = useWindowContentSize()
    const openFile = useOpenFile()
    const drivePageMenu = useDrivePageMenu(currentDir)
    const [columnCount] = useState<number>(6)

    const firstLoading: boolean = getFilesApi.loading && getFilesApi.data === undefined

    const handleFileDoubleClick = (file: File): void => {
        openFile(file)
    }

    const handleScrollerScroll = (el: HTMLDivElement | ScrollParams): void => {
        if (currentDir.id == null) return
        if (getFilesApi.loading) return
        if (getFilesApi.data === undefined) return
        if (getFilesApi.data.nextPageToken == null) return

        if (el.scrollHeight - el.clientHeight - el.scrollTop <= 1200) {
            getFilesApi.run(currentDir, {
                trashed: inTrash,
                pageToken: getFilesApi.data?.nextPageToken
            })
        }
    }

    useEffect(() => {
        if (getFilesApi.data === undefined) return
        if (getFilesApi.data.files === undefined) return
        setCurrentFiles([...currentFiles, ...getFilesApi.data.files])
    }, [getFilesApi.data?.files])

    useEffect(() => {
        if (currentDir.id == null) return
        setCurrentFiles([])
        getFilesApi.run(currentDir, {
            trashed: inTrash
        })
        return () => {
            setCurrentFiles([])
            getFilesApi.cancel()
        }
    }, [])

    // const handle = async (event: globalThis.KeyboardEvent): Promise<void> => {
    //     if (event.repeat) return
    //     if (document.activeElement?.matches('input,textarea,select')) return
    //     if (firstLoading) return
    //     if (event.code === 'KeyQ') {
    //         let needUpdateDir = true
    //         let count = 0
    //         currentFiles.forEach(async (file) => {
    //             if (file.name == null) return
    //             if (file.properties) return
    //             const parsedPath = parse(file.name)
    //             if (parsedPath.ext !== '.mp4') return
    //             count++
    //             const [userName, id] = parsedPath.name.split('-')
    //             await new Promise((resolve) => setTimeout(resolve, count * 1000))
    //             const url = `https://www.tiktok.com/@/video/${id}`
    //             try {
    //                 const data = await youtubeDl(url, {
    //                     dumpSingleJson: true,
    //                     format: 'bv*+ba/b'
    //                 })
    //                 if (typeof data === 'string') return
    //                 const properties = {
    //                     id: data.id,
    //                     userId: data.uploader_id,
    //                     userName: data.uploader,
    //                     userUrl: `https://www.tiktok.com/@${data.uploader_id}`,
    //                     channelId: data.channel_id,
    //                     channelUrl: data.channel_url,
    //                     pageUrl: data.webpage_url
    //                 }
    //                 const description = [
    //                     `id: ${properties.id}`,
    //                     `userId: ${properties.userId}`,
    //                     `userName: ${properties.userName}`,
    //                     `pageUrl: ${properties.pageUrl}`
    //                 ].join('\n')
    //                 if (!currentDir.properties && needUpdateDir) {
    //                     needUpdateDir = false
    //                     await updateFile(currentAccount, currentDir, {
    //                         name: properties.userName,
    //                         properties: {
    //                             userId: properties.userId,
    //                             userName: properties.userName,
    //                             userUrl: properties.userUrl,
    //                             channelId: properties.channelId,
    //                             channelUrl: properties.channelUrl
    //                         }
    //                     })
    //                 }
    //                 const formatedTitle = data.title
    //                     .replace(/#[\p{L}\d\-_\p{Emoji}\p{EComp}\p{EMod}\p{EBase}\p{EPres}]+/gu, '')
    //                     .replace(/ {2,}/g, ' ')
    //                     .trim()
    //                 const name = `${formatedTitle} [${data.id}]${parsedPath.ext}`.trim()
    //                 const newFile = await updateFile(currentAccount, file, {
    //                     name,
    //                     properties,
    //                     description
    //                 })
    //                 replaceCurrentFile(newFile)
    //             } catch (error) {
    //                 console.error(error)
    //                 const properties = {
    //                     id,
    //                     userName,
    //                     pageUrl: `https://www.tiktok.com/@/video/${id}`
    //                 }
    //                 const description = [
    //                     `id: ${properties.id}`,
    //                     `userName: ${properties.userName}`,
    //                     `pageUrl: ${properties.pageUrl}`
    //                 ].join('\n')
    //                 const formatedTitle = (file.description || '')
    //                     .replace(/#[\p{L}\d\-_\p{Emoji}\p{EComp}\p{EMod}\p{EBase}\p{EPres}]+/gu, '')
    //                     .replace(/ {2,}/g, ' ')
    //                     .trim()
    //                 const name = `${formatedTitle} [${properties.id}]${parsedPath.ext}`.trim()
    //                 const newFile = await updateFile(currentAccount, file, {
    //                     name,
    //                     properties,
    //                     description
    //                 })
    //                 replaceCurrentFile(newFile)
    //             }
    //         })
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('keydown', handle)
    //     return () => {
    //         window.removeEventListener('keydown', handle)
    //     }
    // }, [currentFiles])

    useUpdateUsage(currentAccount)

    useDriveNavigateToMainDir(currentAccount, inTrash, breadcrumbItems, currentDir)
    if (currentDir.id === rootDirId && !inTrash) return

    return (
        <>
            <ContextMenu className="h-full overflow-hidden" items={drivePageMenu.items}>
                <DriveDropper>
                    <AutoSizer>
                        {(size) => (
                            <>
                                {viewModeName === ViewModeEnum.List && (
                                    <Table
                                        className="[&_.ant-table-header]:!rounded-none"
                                        style={{
                                            minWidth: size.width
                                        }}
                                        size="small"
                                        sticky
                                        virtual
                                        pagination={false}
                                        rowKey="id"
                                        rowClassName="h-[33px] cursor-default leading-4 [&:has(.context-menu-open)>div]:!bg-zinc-800"
                                        onHeaderRow={() => ({
                                            className: '[&>th]:!rounded-none whitespace-nowrap'
                                        })}
                                        onRow={(file) => ({
                                            onDoubleClick: () => handleFileDoubleClick(file)
                                        })}
                                        scroll={{
                                            y: size.height - 39
                                        }}
                                        onScroll={(event) =>
                                            handleScrollerScroll(event.currentTarget)
                                        }
                                        columns={[
                                            {
                                                title: '#',
                                                width: size.width * 0.06,
                                                render: (_, __, index) => index + 1
                                            },
                                            {
                                                title: 'Tên',
                                                width: size.width * 0.5,
                                                className: '!py-0',
                                                render: (_, file) => (
                                                    <FileCell file={file} tabIndex={0}>
                                                        <div className="flex min-w-0 items-center gap-2">
                                                            <img
                                                                className="size-4"
                                                                src={getFileIconUrl(file)}
                                                                loading="lazy"
                                                            />
                                                            <div className="line-clamp-2">
                                                                {file.name}
                                                            </div>
                                                        </div>
                                                    </FileCell>
                                                )
                                            },
                                            {
                                                title: 'Loại',
                                                dataIndex: 'mimeType',
                                                className: '!py-0',
                                                render: (value) => (
                                                    <div className="flex h-full items-center">
                                                        <div className="line-clamp-2">
                                                            {value === folderMime ? '' : value}
                                                        </div>
                                                    </div>
                                                )
                                            },
                                            {
                                                title: 'Dung lượng',
                                                dataIndex: 'size',
                                                render: (value) =>
                                                    value == null ? '' : formatSize(value)
                                            },
                                            {
                                                title: 'Properties',
                                                dataIndex: 'properties',
                                                render: (value) => value?.id || value?.userId
                                            }
                                        ]}
                                        dataSource={currentFiles}
                                        locale={{
                                            emptyText: () => (
                                                <>
                                                    {firstLoading && 'Đang tải...'}
                                                    {!firstLoading && 'Thư mục trống'}
                                                </>
                                            )
                                        }}
                                    />
                                )}

                                {viewModeName === ViewModeEnum.Grid && (
                                    <Grid
                                        className="p-2"
                                        width={size ? size.width : 1200}
                                        height={windowContentSize.height - 32}
                                        columnCount={columnCount}
                                        columnWidth={
                                            size ? (size.width - 18 - 16) / columnCount : 200
                                        }
                                        rowCount={Math.ceil(currentFiles.length / columnCount)}
                                        rowHeight={180}
                                        onScroll={handleScrollerScroll}
                                        cellRenderer={({ rowIndex, columnIndex, style }) => {
                                            const file: File | undefined =
                                                currentFiles[rowIndex * columnCount + columnIndex]
                                            return (
                                                file && (
                                                    <FileTile
                                                        key={file.id}
                                                        file={file}
                                                        style={style}
                                                        onDoubleClick={() =>
                                                            handleFileDoubleClick(file)
                                                        }
                                                    />
                                                )
                                            )
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </AutoSizer>

                    {!firstLoading && getFilesApi.loading && (
                        <div className="absolute bottom-0 flex w-full justify-center bg-zinc-800/90 p-1">
                            Đang tải...
                        </div>
                    )}
                </DriveDropper>
            </ContextMenu>

            {drivePageMenu.modals}
        </>
    )
}

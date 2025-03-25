import { useRequest, useSize } from 'ahooks'
import { Table } from 'antd'
import { parse } from 'path'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, ScrollParams } from 'react-virtualized'
import youtubeDl from 'youtube-dl-exec'
import { getFiles } from '../api/getFiles'
import { updateFile } from '../api/updateFile'
import { ContextMenu } from '../components/ContextMenu'
import { FileCell } from '../components/FileCell'
import { FileTile } from '../components/FileTile'
import { headerBarHeight } from '../components/HeaderBar'
import { folderMime } from '../constants/constants'
import { ViewModeEnum } from '../constants/viewModes'
import { DriveFile } from '../helpers/getGoogleDrive'
import { useCurrentDir } from '../hooks/useCurrentDir'
import { DriveNavigateState } from '../hooks/useDriveNavigate'
import { useDriveNavigateToMainDir } from '../hooks/useDriveNavigateToMainDir'
import { useDrivePageMenu } from '../hooks/useDrivePageMenu'
import { useOpenFile } from '../hooks/useOpenFile'
import { useUpdateStoreFromStateLocation } from '../hooks/useUpdateStoreFromStateLocation'
import { useWindowContentSize } from '../hooks/useWindowContentSize'
import { replaceCurrentFile } from '../store/replaceCurrentFile'
import { setCurrentFiles } from '../store/setCurrentFiles'
import { useAppStore } from '../store/useAppStore'
import { StateLocation } from '../types/types'
import { formatSize } from '../utils/formatSize'

export function DrivePage(): ReactNode {
    const location: StateLocation = useLocation()
    const locationState: DriveNavigateState | undefined = location.state
    if (locationState === undefined) return

    useUpdateStoreFromStateLocation()

    const currentAccount = useAppStore(
        (state) => locationState.currentAccount ?? state.currentAccount
    )
    if (currentAccount === undefined) return

    const currentDir = useCurrentDir()
    if (currentDir === undefined) return

    const inTrash = useAppStore((state) => locationState.inTrash ?? state.inTrash)

    useDriveNavigateToMainDir()
    if (currentDir.id === 'root' && !inTrash) return

    const currentFiles = useAppStore((state) => state.currentFiles)
    const viewModeName = useAppStore((state) => state.viewModeName)

    const getFilesApi = useRequest(getFiles, { manual: true })
    const windowContentSize = useWindowContentSize()
    const mainRef = useRef<HTMLDivElement | null>(null)
    const size = useSize(mainRef)
    const openFile = useOpenFile()
    const drivePageMenu = useDrivePageMenu(currentAccount, currentDir)
    const [columnCount] = useState<number>(6)

    const handleFileDoubleClick = (file: DriveFile): void => {
        openFile(file)
    }

    const handleScrollerScroll = (el: HTMLDivElement | ScrollParams): void => {
        if (currentDir.id == null) return
        if (getFilesApi.loading) return
        if (!getFilesApi.data?.nextPageToken) return
        if (el.scrollHeight - el.clientHeight - el.scrollTop <= 1200) {
            getFilesApi.run(currentAccount, {
                dirId: currentDir.id,
                trashed: inTrash,
                pageToken: getFilesApi.data?.nextPageToken ?? undefined
            })
        }
    }

    useEffect(() => {
        if (!getFilesApi.data?.files) return
        setCurrentFiles([...(currentFiles ?? []), ...getFilesApi.data.files])
    }, [getFilesApi.data?.files])

    useEffect(() => {
        if (currentDir.id == null) return
        setCurrentFiles(undefined)
        getFilesApi.run(currentAccount, {
            dirId: currentDir.id,
            trashed: inTrash
        })
        return () => {
            setCurrentFiles(undefined)
            getFilesApi.cancel()
        }
    }, [])

    const handle = async (event: globalThis.KeyboardEvent): Promise<void> => {
        if (event.repeat) return
        if (document.activeElement?.matches('input,textarea,select')) return
        if (currentFiles === undefined) return
        if (event.code === 'KeyQ') {
            let needUpdateDir = true
            let count = 0
            currentFiles.forEach(async (file) => {
                if (file.name == null) return
                if (file.properties) return
                const parsedPath = parse(file.name)
                if (parsedPath.ext !== '.mp4') return
                count++
                const [userName, id] = parsedPath.name.split('-')
                await new Promise((resolve) => setTimeout(resolve, count * 1000))
                const url = `https://www.tiktok.com/@/video/${id}`
                try {
                    const data = await youtubeDl(url, {
                        dumpSingleJson: true,
                        format: 'bv*+ba/b'
                    })
                    if (typeof data === 'string') return
                    const properties = {
                        id: data.id,
                        userId: data.uploader_id,
                        userName: data.uploader,
                        userUrl: `https://www.tiktok.com/@${data.uploader_id}`,
                        channelId: data.channel_id,
                        channelUrl: data.channel_url,
                        pageUrl: data.webpage_url
                    }
                    const description = [
                        `id: ${properties.id}`,
                        `userId: ${properties.userId}`,
                        `userName: ${properties.userName}`,
                        `pageUrl: ${properties.pageUrl}`
                    ].join('\n')
                    if (!currentDir.properties && needUpdateDir) {
                        needUpdateDir = false
                        await updateFile(currentAccount, currentDir, {
                            name: properties.userName,
                            properties: {
                                userId: properties.userId,
                                userName: properties.userName,
                                userUrl: properties.userUrl,
                                channelId: properties.channelId,
                                channelUrl: properties.channelUrl
                            }
                        })
                    }
                    const formatedTitle = data.title
                        .replace(/#[\p{L}\d\-_\p{Emoji}\p{EComp}\p{EMod}\p{EBase}\p{EPres}]+/gu, '')
                        .replace(/ {2,}/g, ' ')
                        .trim()
                    const name = `${formatedTitle} [${data.id}]${parsedPath.ext}`.trim()
                    const newFile = await updateFile(currentAccount, file, {
                        name,
                        properties,
                        description
                    })
                    replaceCurrentFile(file, newFile)
                } catch (error) {
                    console.error(error)
                    const properties = {
                        id,
                        userName,
                        pageUrl: `https://www.tiktok.com/@/video/${id}`
                    }
                    const description = [
                        `id: ${properties.id}`,
                        `userName: ${properties.userName}`,
                        `pageUrl: ${properties.pageUrl}`
                    ].join('\n')
                    const formatedTitle = (file.description || '')
                        .replace(/#[\p{L}\d\-_\p{Emoji}\p{EComp}\p{EMod}\p{EBase}\p{EPres}]+/gu, '')
                        .replace(/ {2,}/g, ' ')
                        .trim()
                    const name = `${formatedTitle} [${properties.id}]${parsedPath.ext}`.trim()
                    const newFile = await updateFile(currentAccount, file, {
                        name,
                        properties,
                        description
                    })
                    replaceCurrentFile(file, newFile)
                }
            })
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handle)
        return () => {
            window.removeEventListener('keydown', handle)
        }
    }, [currentFiles])

    return (
        <>
            <ContextMenu className="h-full overflow-hidden" items={drivePageMenu.items}>
                <div ref={mainRef} className="relative h-full">
                    {currentFiles === undefined && (
                        <div className="flex items-center justify-center py-8 text-zinc-400">
                            Đang tải...
                        </div>
                    )}

                    {currentFiles !== undefined && (
                        <>
                            {viewModeName === ViewModeEnum.List && (
                                <Table
                                    className="[&_.ant-table-header]:!rounded-none"
                                    size="small"
                                    sticky
                                    virtual
                                    pagination={false}
                                    rowKey="id"
                                    rowClassName="[&:has(.context-menu-open)>div]:!bg-zinc-800 h-[33px] leading-4 cursor-default"
                                    onHeaderRow={() => ({
                                        className: '[&>th]:!rounded-none whitespace-nowrap'
                                    })}
                                    onRow={(file) => ({
                                        onDoubleClick: () => handleFileDoubleClick(file)
                                    })}
                                    scroll={{
                                        y: windowContentSize.height - headerBarHeight - 39
                                    }}
                                    onScroll={(event) => handleScrollerScroll(event.currentTarget)}
                                    columns={[
                                        {
                                            title: '#',
                                            width: size && size.width * 0.06,
                                            render: (_, __, index) => index + 1
                                        },
                                        {
                                            title: 'Tên',
                                            width: size && size.width * 0.5,
                                            className: '!py-0',
                                            render: (_, file) => (
                                                <FileCell file={file} account={currentAccount}>
                                                    {file.name}
                                                </FileCell>
                                            )
                                        },
                                        {
                                            title: 'Loại',
                                            dataIndex: 'mimeType',
                                            render: (value) => (value === folderMime ? '' : value)
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
                                />
                            )}

                            {viewModeName === ViewModeEnum.Grid && (
                                <Grid
                                    className="p-2"
                                    width={size ? size.width : 1200}
                                    height={windowContentSize.height - 32}
                                    columnCount={columnCount}
                                    columnWidth={size ? (size.width - 18 - 16) / columnCount : 200}
                                    rowCount={Math.ceil(currentFiles.length / columnCount)}
                                    rowHeight={180}
                                    onScroll={handleScrollerScroll}
                                    cellRenderer={({ rowIndex, columnIndex, style }) => {
                                        const file: DriveFile | undefined =
                                            currentFiles[rowIndex * columnCount + columnIndex]
                                        return (
                                            file && (
                                                <FileTile
                                                    key={file.id}
                                                    file={file}
                                                    account={currentAccount}
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

                            {getFilesApi.loading && (
                                <div className="absolute bottom-0 flex w-full justify-center bg-zinc-800/90 p-1">
                                    Đang tải...
                                </div>
                            )}
                        </>
                    )}
                </div>
            </ContextMenu>

            {drivePageMenu.modals}
        </>
    )
}

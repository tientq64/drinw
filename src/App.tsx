import { useUpdateEffect } from 'ahooks'
import { App as AntdApp, ConfigProvider, theme, ThemeConfig } from 'antd'
import { ipcRenderer } from 'electron'
import { ReactNode, useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { filterProcessingItems } from './helpers/filterProcessingItems'
import { init } from './helpers/init'
import { router } from './router/router'
import { useAppStore } from './store/useAppStore'

init()

export function App(): ReactNode {
    const motion = useAppStore((state) => state.motion)

    const processingItemsCount = useAppStore<number>((state) => {
        return filterProcessingItems(state.uploadItems).length
    })

    const darkTheme = useMemo<ThemeConfig>(() => {
        return {
            algorithm: theme.darkAlgorithm,
            token: { motion },
            hashed: false
        }
    }, [motion])

    useUpdateEffect(() => {
        ipcRenderer.send('setBadgeCount', processingItemsCount)
    }, [processingItemsCount])

    return (
        <ConfigProvider theme={darkTheme}>
            <AntdApp className="h-full">
                <RouterProvider router={router} />
            </AntdApp>
        </ConfigProvider>
    )
}

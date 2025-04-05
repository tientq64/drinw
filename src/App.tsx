import { useUpdateEffect } from 'ahooks'
import { App as AntdApp, ConfigProvider } from 'antd'
import localeVi from 'antd/locale/vi_VN'
import { ipcRenderer } from 'electron'
import { ReactNode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { filterProcessingItems } from './helpers/filterProcessingItems'
import { useAntdTheme } from './hooks/useAntdTheme'
import { router } from './router/router'
import { useAppStore } from './store/useAppStore'

export function App(): ReactNode {
    const processingItemsCount = useAppStore<number>((state) => {
        return filterProcessingItems(state.uploadItems).length
    })

    const darkTheme = useAntdTheme()

    useUpdateEffect(() => {
        ipcRenderer.send('setBadgeCount', processingItemsCount)
    }, [processingItemsCount])

    return (
        <ConfigProvider theme={darkTheme} locale={localeVi}>
            <AntdApp className="h-full">
                <RouterProvider router={router} />
            </AntdApp>
        </ConfigProvider>
    )
}

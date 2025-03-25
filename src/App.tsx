import { App as AntdApp, ConfigProvider, theme, ThemeConfig } from 'antd'
import { ReactNode, useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { init } from './helpers/init'
import { router } from './router'
import { useAppStore } from './store/useAppStore'

init()

export function App(): ReactNode {
    const motion = useAppStore((state) => state.motion)

    const darkTheme = useMemo<ThemeConfig>(() => {
        return {
            algorithm: theme.darkAlgorithm,
            token: { motion },
            hashed: false
        }
    }, [motion])

    // useAutoSaveUserData()

    return (
        <ConfigProvider theme={darkTheme}>
            <AntdApp className="h-full">
                <RouterProvider router={router} />
            </AntdApp>
        </ConfigProvider>
    )
}

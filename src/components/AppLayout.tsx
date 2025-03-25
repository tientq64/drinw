import { Splitter } from 'antd'
import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderBar } from './HeaderBar'
import { SideBar } from './SideBar'
import { UploadPanel } from './UploadPanel'

export function AppLayout(): ReactNode {
    return (
        <div className="flex h-full flex-col">
            <HeaderBar />

            <div className="flex flex-1">
                <SideBar />

                <div className="flex-1">
                    <Outlet />
                </div>

                <UploadPanel />
            </div>
        </div>
    )
}

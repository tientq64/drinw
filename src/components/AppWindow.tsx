import { ReactNode } from 'react'
import { WindowContent } from './WindowContent'
import { WindowHeader } from './WindowHeader'

export function AppWindow(): ReactNode {
    return (
        <div className="flex h-full flex-col">
            <WindowHeader />
            <WindowContent />
        </div>
    )
}

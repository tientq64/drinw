import { ReactNode } from 'react'
import { AppLayout } from './AppLayout'

export function WindowContent(): ReactNode {
    return (
        <div className="flex-1 overflow-hidden">
            <AppLayout />
        </div>
    )
}

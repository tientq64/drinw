import { ReactNode } from 'react'
import { useWindowHeaderHeight } from '../hooks/useWindowHeaderHeight'

export function WindowHeader(): ReactNode {
    const height = useWindowHeaderHeight()

    return (
        <div className="app-region-drag flex items-center justify-center" style={{ height }}>
            DriNW
        </div>
    )
}

import { useDrop } from 'ahooks'
import { HTMLAttributes, ReactNode, useRef, useState } from 'react'
import { LocalFile } from '../types/types'

interface DropperProps extends HTMLAttributes<HTMLElement> {
    dragEnter?: ReactNode | (() => ReactNode)
    onText?: (text: string) => void
    onFiles?: (files: LocalFile[]) => void
    onUrl?: (url: string) => void
}

export function Dropper({
    dragEnter,
    onText,
    onFiles,
    onUrl,
    children,
    ...props
}: DropperProps): ReactNode {
    const [dragged, setDragged] = useState<boolean>(false)
    const mainRef = useRef<HTMLDivElement | null>(null)

    useDrop(mainRef, {
        onDragEnter: () => setDragged(true),
        onDragLeave: () => setDragged(false),
        onDrop: () => setDragged(false),
        onText,
        onFiles,
        onUri: onUrl
    })

    return (
        <div {...props} ref={mainRef}>
            {children}

            {dragged && <>{typeof dragEnter === 'function' ? dragEnter() : dragEnter}</>}
        </div>
    )
}

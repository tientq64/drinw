import { useEventListener } from 'ahooks'
import { useLayoutEffect, useState } from 'react'
import { useWindowHeaderHeight } from './useWindowHeaderHeight'

interface WindowContentSize {
    width: number
    height: number
}

export function useWindowContentSize(): WindowContentSize {
    const [size, setSize] = useState<WindowContentSize>({ width: 0, height: 0 })
    const windowHeaderHeight = useWindowHeaderHeight()

    const handleWindowResize = (): void => {
        setSize({
            width: innerWidth,
            height: innerHeight - windowHeaderHeight
        })
    }

    useEventListener('resize', handleWindowResize)
    useLayoutEffect(handleWindowResize, [windowHeaderHeight])

    return size
}

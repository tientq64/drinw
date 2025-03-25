import { useAppStore } from '../store/useAppStore'

export function useWindowHeaderHeight(): number {
    const isMaximized = useAppStore((state) => state.isMaximized)

    return isMaximized ? 24 : 32
}

import { useAppStore } from '../store/useAppStore'

export function useTableHeaderHeight(): number {
    const compactMode = useAppStore((state) => state.compactMode)

    if (compactMode) return 29

    return 39
}

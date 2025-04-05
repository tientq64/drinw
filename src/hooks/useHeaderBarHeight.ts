import { useAppStore } from '../store/useAppStore'

export function useHeaderBarHeight(): number {
    const compactMode = useAppStore((state) => state.compactMode)

    if (compactMode) return 30

    return 33
}

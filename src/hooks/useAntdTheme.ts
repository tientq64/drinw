import { MappingAlgorithm, theme, ThemeConfig } from 'antd'
import { useEffect, useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useAntdTheme(): ThemeConfig {
    const motion = useAppStore((state) => state.motion)
    const compactMode = useAppStore((state) => state.compactMode)

    const darkTheme = useMemo<ThemeConfig>(() => {
        const algorithm: MappingAlgorithm[] = [theme.darkAlgorithm]
        if (compactMode) {
            algorithm.push(theme.compactAlgorithm)
        }
        return {
            algorithm,
            token: { motion },
            hashed: false
        }
    }, [motion, compactMode])

    useEffect(() => {
        if (compactMode) {
            document.body.classList.add('dnw-compact')
        } else {
            document.body.classList.remove('dnw-compact')
        }
    }, [compactMode])

    return darkTheme
}

import { setState } from './useAppStore'

export function setCompactMode(compactMode: boolean): void {
    setState({ compactMode })
}

import { setState } from './useAppStore'

export function setIsMaximized(isMaximized: boolean): void {
    setState({ isMaximized })
}

import { setState } from './useAppStore'

export function setMotion(motion: boolean): void {
    setState({ motion })
}

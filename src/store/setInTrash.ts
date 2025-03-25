import { setState } from './useAppStore'

export function setInTrash(inTrash: boolean): void {
    setState({ inTrash })
}

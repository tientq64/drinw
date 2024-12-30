import { setState } from './useAppStore'

export function setIsInTrash(isInTrash: boolean): void {
	setState({ isInTrash })
}

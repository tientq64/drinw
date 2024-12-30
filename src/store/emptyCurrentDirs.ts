import { setState } from './useAppStore'

export function emptyCurrentDirs(): void {
	setState({ currentDirs: [] })
}

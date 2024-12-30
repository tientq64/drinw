import { Dir } from './types'
import { setState } from './useAppStore'

export function pushCurrentDirs(...dirs: Dir[]): void {
	setState((state) => {
		state.currentDirs.push(...dirs)
	})
}

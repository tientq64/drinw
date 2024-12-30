import { findIndex } from 'lodash-es'
import { setState } from './useAppStore'

export function jumpCurrentDirs(dirId: string): void {
	setState((state) => {
		const index: number = findIndex(state.currentDirs, { dirId })
		if (index === -1) return

		state.currentDirs.splice(index + 1)
	})
}

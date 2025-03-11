import { findIndex } from 'lodash-es'
import { setState } from './useAppStore'

export function jumpToBreadcrumbItem(dirId: string): void {
	setState((state) => {
		const index: number = findIndex(state.breadcrumbItems, { dirId })
		if (index === -1) return

		state.breadcrumbItems.splice(index + 1)
	})
}

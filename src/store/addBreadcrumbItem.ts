import { BreadcrumbItem } from './types'
import { setState } from './useAppStore'

export function addBreadcrumbItem(...breadcrumbItems: BreadcrumbItem[]): void {
	setState((state) => {
		state.breadcrumbItems.push(...breadcrumbItems)
	})
}

import { setState } from './useAppStore'

export function emptyBreadcrumbItems(): void {
	setState({ breadcrumbItems: [] })
}

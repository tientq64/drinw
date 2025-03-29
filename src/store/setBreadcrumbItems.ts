import { File } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function setBreadcrumbItems(breadcrumbItems: File[]): void {
    setState({ breadcrumbItems })
}

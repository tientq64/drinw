import { DriveFile } from '../helpers/getGoogleDrive'
import { setState } from './useAppStore'

export function setBreadcrumbItems(breadcrumbItems: DriveFile[]): void {
    setState({ breadcrumbItems })
}

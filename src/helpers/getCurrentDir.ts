import { getState } from '../store/useAppStore'
import { DriveFile } from './getGoogleDrive'

export function getCurrentDir(): DriveFile | undefined {
    return getState().breadcrumbItems.at(-1)
}

import { getState } from '../store/useAppStore'
import { File } from './getGoogleDrive'

export function getCurrentDir(): File | undefined {
    return getState().breadcrumbItems.at(-1)
}

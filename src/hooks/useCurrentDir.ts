import { useLocation } from 'react-router-dom'
import { DriveFile } from '../helpers/getGoogleDrive'
import { useAppStore } from '../store/useAppStore'
import { StateLocation } from '../types/types'

export function useCurrentDir(): DriveFile | undefined {
    const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)

    const location: StateLocation = useLocation()

    return location.state?.breadcrumbItems.at(-1) ?? breadcrumbItems.at(-1)
}

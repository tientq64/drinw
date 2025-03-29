import { folderMime } from '../constants/constants'
import { File } from '../helpers/getGoogleDrive'
import { openWithBrowser } from '../helpers/openWithBrowser'
import { useAppStore } from '../store/useAppStore'
import { useDriveNavigate } from './useDriveNavigate'

type OpenFileFunction = (file: File, isOpenWithBrowser?: boolean) => void

export function useOpenFile(): OpenFileFunction {
    const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)

    const driveNavigate = useDriveNavigate()

    return (file, isOpenWithBrowser = false) => {
        if (file.mimeType === folderMime && !isOpenWithBrowser) {
            driveNavigate({
                breadcrumbItems: [...breadcrumbItems, file]
            })
        } else {
            openWithBrowser(file.webViewLink)
        }
    }
}

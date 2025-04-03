import { dirWebViewLinkTemplate, fileWebViewLinkTemplate } from '../constants/constants'
import { checkFileIsDir } from '../helpers/checkFileIsDir'
import { File } from '../helpers/getGoogleDrive'
import { openWithBrowser } from '../helpers/openWithBrowser'
import { useAppStore } from '../store/useAppStore'
import { useDriveNavigate } from './useDriveNavigate'

type OpenFileFunction = (file: File, isOpenWithBrowser?: boolean) => void

export function useOpenFile(): OpenFileFunction {
    const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)

    const driveNavigate = useDriveNavigate()

    return (file, isOpenWithBrowser = false) => {
        if (file.id == null) return

        const isDir: boolean = checkFileIsDir(file)

        if (isDir && !isOpenWithBrowser) {
            driveNavigate({
                breadcrumbItems: [...breadcrumbItems, file]
            })
        } else {
            const webViewLinkTemplate: string = isDir
                ? dirWebViewLinkTemplate
                : fileWebViewLinkTemplate
            const webViewLink: string = webViewLinkTemplate.replace('{id}', file.id)

            openWithBrowser(webViewLink)
        }
    }
}

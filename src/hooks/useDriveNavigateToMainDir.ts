import { useEffect } from 'react'
import { folderMime } from '../constants/constants'
import { getAccountEmailName } from '../helpers/getAccountEmailName'
import { DriveFile } from '../helpers/getGoogleDrive'
import { useAppStore } from '../store/useAppStore'
import { useCurrentDir } from './useCurrentDir'
import { rootDir, useDriveNavigate } from './useDriveNavigate'

export function useDriveNavigateToMainDir(): void {
    const currentAccount = useAppStore((state) => state.currentAccount)
    if (currentAccount === undefined) return

    const inTrash = useAppStore((state) => state.inTrash)
    const breadcrumbItems = useAppStore((state) => state.breadcrumbItems)

    const currentDir = useCurrentDir()
    if (currentDir === undefined) return

    const driveNavigate = useDriveNavigate()

    const currentAccountName: string = getAccountEmailName(currentAccount.email)

    useEffect(() => {
        if (currentDir.id !== rootDir.id) return
        if (inTrash) return
        if (currentAccount.mainDirId === undefined) return
        const mainDir: DriveFile = {
            id: currentAccount.mainDirId,
            name: currentAccountName,
            mimeType: folderMime,
            webViewLink: `https://drive.google.com/drive/folders/${currentAccount.mainDirId}`
        }
        driveNavigate(
            {
                breadcrumbItems: [...breadcrumbItems, mainDir]
            },
            true
        )
    }, [currentDir, inTrash, currentAccount])
}

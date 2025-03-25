import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getAccountEmailName } from '../helpers/getAccountEmailName'
import { DriveFile } from '../helpers/getGoogleDrive'
import { StateLocation } from '../types/types'
import { useCurrentDir } from './useCurrentDir'
import { rootDir, useDriveNavigate } from './useDriveNavigate'
import { folderMime } from '../constants/constants'

export function useDriveNavigateToMainDir(): void {
    const location: StateLocation = useLocation()
    if (location.state === undefined) return

    const { currentAccount, inTrash, breadcrumbItems } = location.state
    if (currentAccount === undefined) return

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

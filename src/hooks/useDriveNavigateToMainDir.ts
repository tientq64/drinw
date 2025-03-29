import { useEffect } from 'react'
import { rootDirId } from '../constants/constants'
import { File } from '../helpers/getGoogleDrive'
import { makeMainDir } from '../helpers/makeMainDir'
import { Account } from '../store/types'
import { useDriveNavigate } from './useDriveNavigate'

export function useDriveNavigateToMainDir(
    currentAccount: Account,
    inTrash: boolean,
    breadcrumbItems: File[],
    currentDir: File
): void {
    const driveNavigate = useDriveNavigate()

    useEffect(() => {
        if (currentDir.id !== rootDirId) return
        if (inTrash) return
        if (currentAccount.mainDirId === undefined) return

        const mainDir: File = makeMainDir(currentAccount)

        driveNavigate(
            {
                breadcrumbItems: [...breadcrumbItems, mainDir]
            },
            true
        )
    }, [currentDir, inTrash, currentAccount])
}

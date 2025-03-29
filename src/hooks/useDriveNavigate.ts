import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { File } from '../helpers/getGoogleDrive'
import { makeRootDir } from '../helpers/makeRootDir'
import { Account } from '../store/types'
import { getState } from '../store/useAppStore'

export interface DriveNavigateState {
    currentAccount: Account | undefined
    inTrash: boolean
    breadcrumbItems: File[]
}

type DriveNavigateFunction = (navState?: Partial<DriveNavigateState>, replace?: boolean) => void

export function useDriveNavigate(): DriveNavigateFunction {
    const navigate = useNavigate()

    return (navState, replace) => {
        const storeState = getState()

        const currentAccount: Account | undefined =
            navState?.currentAccount ?? storeState.currentAccount
        if (currentAccount === undefined) return

        const inTrash: boolean = navState?.inTrash ?? storeState.inTrash

        let breadcrumbItems: File[] = navState?.breadcrumbItems ?? storeState.breadcrumbItems
        breadcrumbItems = [...breadcrumbItems]
        if (breadcrumbItems.length === 0) {
            breadcrumbItems.push(makeRootDir(currentAccount))
        }

        const hash: string = nanoid()

        navigate(`/drive/${hash}`, {
            state: {
                currentAccount,
                inTrash,
                breadcrumbItems
            },
            replace
        })
    }
}

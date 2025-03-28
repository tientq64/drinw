import { nanoid } from 'nanoid'
import { useLocation, useNavigate } from 'react-router-dom'
import { DriveFile } from '../helpers/getGoogleDrive'
import { getState } from '../store/useAppStore'
import { Account } from '../store/types'
import { StateLocation } from '../types/types'

export interface DriveNavigateState {
    currentAccount: Account | undefined
    inTrash: boolean
    breadcrumbItems: DriveFile[]
}

export const rootDir: DriveFile = {
    id: 'root',
    name: 'Root'
}

type DriveNavigateFunction = (partialState: Partial<DriveNavigateState>, replace?: boolean) => void

export function useDriveNavigate(): DriveNavigateFunction {
    const navigate = useNavigate()

    return (partialState, replace) => {
        const storeState = getState()

        const currentAccount: Account | undefined =
            partialState.currentAccount ?? storeState.currentAccount

        const inTrash: boolean = partialState.inTrash ?? storeState.inTrash

        let breadcrumbItems: DriveFile[] =
            partialState.breadcrumbItems ?? storeState.breadcrumbItems
        breadcrumbItems = [...breadcrumbItems]
        if (breadcrumbItems.length === 0) {
            breadcrumbItems.push(rootDir)
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

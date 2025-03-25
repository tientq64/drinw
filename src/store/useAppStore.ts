import { produce, WritableDraft } from 'immer'
import { create } from 'zustand'
import { ViewModeEnum } from '../constants/viewModes'
import { DriveFile } from '../helpers/getGoogleDrive'
import { loadUserData, UserData } from '../helpers/loadUserData'
import { Account, UploadItem } from './types'

export interface AppStore {
    masterEmail: string | undefined
    accounts: Account[]
    currentAccount: Account | undefined
    inTrash: boolean
    breadcrumbItems: DriveFile[]
    currentFiles: DriveFile[] | undefined
    viewModeName: ViewModeEnum
    uploadItems: UploadItem[]
    isDefaultSmartUpload: boolean
    maxUploadQueueSize: number
    motion: boolean
    isMaximized: boolean
}

const userData: UserData = loadUserData()

export const useAppStore = create<AppStore>(() => ({
    masterEmail: userData.masterEmail,
    accounts: userData.accounts,
    currentAccount: undefined,
    inTrash: false,
    breadcrumbItems: [],
    currentFiles: undefined,
    viewModeName: ViewModeEnum.List,
    uploadItems: [],
    isDefaultSmartUpload: true,
    maxUploadQueueSize: 1024 * 1024 * 100,
    motion: true,
    isMaximized: true
}))

type SetStatePartialFunc = (draft: WritableDraft<AppStore>) => void
type SetStatePartial = Partial<AppStore> | SetStatePartialFunc
type SetState = (partial: SetStatePartial) => void

type DraftFunc = (state: AppStore) => Partial<AppStore>

export const setState: SetState = (partial) => {
    if (typeof partial === 'function') {
        const draftPartial: DraftFunc = (state) => produce(state, partial)
        useAppStore.setState(draftPartial)
    } else {
        useAppStore.setState(partial)
    }
}

export const getState = useAppStore.getState

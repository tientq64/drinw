import { produce, WritableDraft } from 'immer'
import { create } from 'zustand'
import { ViewModeEnum } from '../constants/viewModes'
import { File } from '../helpers/getGoogleDrive'
import { loadUserData, UserData } from '../helpers/loadUserData'
import { Account } from './types'
import { UploadItem } from '../helpers/makeUploadItem'
import { MB } from '../constants/constants'

export interface AppStore {
    masterEmail: string | undefined
    accounts: Account[]
    currentAccount: Account | undefined
    inTrash: boolean
    breadcrumbItems: File[]
    currentFiles: File[]
    viewModeName: ViewModeEnum
    uploadItems: UploadItem[]
    isDefaultSmartUpload: boolean
    maxUploadQueueSize: number
    uploadChunkSize: number
    motion: boolean
    compactMode: boolean
    isMaximized: boolean
}

const userData: UserData = loadUserData()

export const useAppStore = create<AppStore>(() => ({
    masterEmail: userData.masterEmail,
    accounts: userData.accounts,
    currentAccount: undefined,
    inTrash: false,
    breadcrumbItems: [],
    currentFiles: [],
    viewModeName: ViewModeEnum.List,
    uploadItems: [],
    isDefaultSmartUpload: true,
    maxUploadQueueSize: 100 * MB,
    uploadChunkSize: 10 * MB,
    motion: true,
    compactMode: false,
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

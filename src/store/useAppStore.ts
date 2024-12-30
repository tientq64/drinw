import { produce, WritableDraft } from 'immer'
import { create } from 'zustand'
import { FilesViewModeEnum } from '../constants/filesViewModes'
import { loadAppData } from './loadAppData'
import { Account, Dir, UploadItem } from './types'
import { convertToBytes } from '../utils/convertToBytes'

export interface AppStore {
	masterEmail: string
	accounts: Account[]
	currentAccount: Account | undefined
	currentDirs: Dir[]
	isInTrash: boolean
	filesViewMode: FilesViewModeEnum
	uploadItems: UploadItem[]
	isSmartUpload: boolean
	maxUploadingSize: number
	maxUploadingParallel: number
}

const defaultAppStore: AppStore = {
	masterEmail: '',
	accounts: [],
	currentAccount: undefined,
	currentDirs: [],
	isInTrash: false,
	filesViewMode: FilesViewModeEnum.List,
	uploadItems: [],
	isSmartUpload: true,
	maxUploadingSize: convertToBytes(500, 'MB'),
	maxUploadingParallel: 10
}

export const useAppStore = create<AppStore>(() => defaultAppStore)

export function setState(
	partial: AppStore | Partial<AppStore> | ((draft: WritableDraft<AppStore>) => void),
	replace?: false
): void {
	if (typeof partial === 'function') {
		const draftPartial: (state: AppStore) => AppStore | Partial<AppStore> = (state) =>
			produce(state, partial)
		useAppStore.setState(draftPartial, replace)
	} else {
		useAppStore.setState(partial, replace)
	}
}

export const getState = useAppStore.getState

loadAppData()

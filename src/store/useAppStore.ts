import { readJsonSync } from 'fs-extra'
import { findIndex } from 'lodash-es'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { FilesViewModeEnum } from '../constants/filesViewModes'

export type Kind = 'youtube' | 'tiktok' | 'spankbang' | 'facebook' | 'mrcong'

export interface Account {
	clientEmail: string
	title?: string
	kind?: Kind
	mainDirId?: string
	tiktokUsernameFirstLetter?: string
	driveSize: number
	trashSize: number
	privateKey: string
}

export interface Dir {
	dirId: string
	dirName: string
}

export interface AppStoreState {
	masterEmail: string
	accounts: Account[]
	currentAccount: Account | undefined
	currentDirs: Dir[]
	isInTrash: boolean
	filesViewMode: FilesViewModeEnum
}

export interface AppStoreActions {
	setMasterEmail(masterEmail: string): void
	addAccount(account: Account): void
	setCurrentAccount(currentAccount: Account | undefined): void
	pushCurrentDirs(...dirs: Dir[]): void
	jumpCurrentDirs(dirId: string): void
	emptyCurrentDirs(): void
	setIsInTrash(isInTrash: boolean): void
	setFilesViewMode(filesViewMode: FilesViewModeEnum): void
}

export type AppStore = AppStoreState & AppStoreActions

export const useAppStore = create<AppStore>()(
	immer((set) => ({
		masterEmail: '',
		accounts: [],
		currentAccount: undefined,
		currentDirs: [],
		isInTrash: false,
		filesViewMode: FilesViewModeEnum.List,

		setMasterEmail(masterEmail) {
			set({ masterEmail })
		},
		addAccount(account) {
			account = structuredClone(account)
			set((state) => {
				state.accounts.push(account)
			})
		},
		setCurrentAccount(currentAccount) {
			set({ currentAccount })
		},
		pushCurrentDirs(...dirs) {
			set((state) => {
				state.currentDirs.push(...dirs)
			})
		},
		jumpCurrentDirs(dirId) {
			set((state) => {
				const index: number = findIndex(state.currentDirs, { dirId })
				if (index === -1) return
				state.currentDirs.splice(index + 1)
			})
		},
		emptyCurrentDirs() {
			set({ currentDirs: [] })
		},
		setIsInTrash(isInTrash) {
			set({ isInTrash })
		},
		setFilesViewMode(filesViewMode) {
			set({ filesViewMode })
		}
	}))
)

export type AppData = Pick<AppStore, 'masterEmail' | 'accounts'>

const defaultAppData: AppData = {
	masterEmail: '',
	accounts: []
}

let jsonAppData: Partial<AppData>
try {
	jsonAppData = readJsonSync('data/appData.json')
} catch {
	jsonAppData = {}
}
const appData: AppData = {
	...defaultAppData,
	...jsonAppData
}

const appStore = useAppStore.getState()
appStore.setMasterEmail(appData.masterEmail)
for (const account of appData.accounts) {
	appStore.addAccount(account)
}

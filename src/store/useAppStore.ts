import { readJsonSync } from 'fs-extra'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { findIndex } from 'lodash-es'

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
}

export interface AppStoreActions {
	setMasterEmail(masterEmail: string): void
	addAccount(account: Account): void
	setCurrentAccount(currentAccount: Account | undefined): void
	pushCurrentDir(...dirs: Dir[]): void
	jumpCurrentDir(dirId: string): void
}

export type AppStore = AppStoreState & AppStoreActions

export const useAppStore = create<AppStore>()(
	immer((set) => ({
		masterEmail: '',
		accounts: [],
		currentDirs: [],
		currentAccount: undefined,

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
		pushCurrentDir(...dirs) {
			set((state) => {
				state.currentDirs.push(...dirs)
			})
		},
		jumpCurrentDir(dirId) {
			set((state) => {
				const index: number = findIndex(state.currentDirs, { dirId })
				if (index === -1) return
				state.currentDirs.splice(index + 1)
			})
		}
	}))
)

export type AppData = Pick<AppStore, 'masterEmail' | 'accounts'>

const defaultAppData: AppData = {
	masterEmail: '',
	accounts: []
}
const jsonAppData: Partial<AppData> = readJsonSync('data/appData.json')
const appData: AppData = {
	...defaultAppData,
	...jsonAppData
}

const appStore = useAppStore.getState()
appStore.setMasterEmail(appData.masterEmail)
for (const account of appData.accounts) {
	appStore.addAccount(account)
}

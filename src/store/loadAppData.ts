import { readJsonSync } from 'fs-extra'
import { addAccount } from './addAccount'
import { setMasterEmail } from './setMasterEmail'
import { AppStore } from './useAppStore'

export type AppData = Pick<AppStore, 'masterEmail' | 'accounts'>

const defaultAppData: AppData = {
	masterEmail: '',
	accounts: []
}

export function loadAppData(): void {
	let jsonAppData: Partial<AppData>
	try {
		jsonAppData = readJsonSync('data/appData.json')
	} catch {
		jsonAppData = {}
	}
	const appData: AppData = { ...defaultAppData, ...jsonAppData }

	setMasterEmail(appData.masterEmail)
	for (const account of appData.accounts) {
		addAccount(account)
	}
}

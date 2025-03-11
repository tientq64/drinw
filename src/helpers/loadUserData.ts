import { readJsonSync } from 'fs-extra'
import { addAccount } from '../store/addAccount'
import { setMasterEmail } from '../store/setMasterEmail'
import { AppStore } from '../store/useAppStore'

export type UserData = Pick<AppStore, 'masterEmail' | 'accounts'>

const defaultUserData: UserData = {
	masterEmail: undefined,
	accounts: []
}

/**
 * Load dữ liệu người dùng từ tập tin `data/userData.json` và cập nhật vào app store.
 */
export function loadUserData(): void {
	let jsonUserData: Partial<UserData>
	try {
		jsonUserData = readJsonSync('data/userData.json')
	} catch {
		jsonUserData = {}
	}

	const initialUserData: UserData = structuredClone(defaultUserData)
	const userData: UserData = { ...initialUserData, ...jsonUserData }

	setMasterEmail(userData.masterEmail)
	for (const account of userData.accounts) {
		addAccount(account)
	}
}

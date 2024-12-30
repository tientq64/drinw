import { Account } from './types'
import { setState } from './useAppStore'

export function addAccount(account: Account): void {
	account = structuredClone(account)

	setState((state) => {
		state.accounts.push(account)
	})
}

import { Account } from '../store/useAppStore'

export function getAccountClientEmailName(account: Account): string {
	return account.clientEmail.split('@')[0]
}

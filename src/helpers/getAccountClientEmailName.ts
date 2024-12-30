import { Account } from '../store/types'

export function getAccountClientEmailName(account: Account): string {
	return account.clientEmail.split('@')[0]
}

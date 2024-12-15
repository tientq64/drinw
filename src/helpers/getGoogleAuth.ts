import { google } from 'googleapis'
import { Account } from '../store/useAppStore'

export function getGoogleAuth(account: Account) {
	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_email: account.clientEmail,
			private_key: account.privateKey
		},
		scopes: 'https://www.googleapis.com/auth/drive'
	})
	return auth
}

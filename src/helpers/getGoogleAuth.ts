import { google } from 'googleapis'
import { Account } from '../store/types'

export function getGoogleAuth(account: Account) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: account.email,
            private_key: account.privateKey
        },
        scopes: 'https://www.googleapis.com/auth/drive'
    })
    return auth
}

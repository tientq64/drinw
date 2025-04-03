import type { GoogleAuth } from 'google-auth-library'
import type { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { google } from 'googleapis'
import { Account } from '../store/types'

export type Auth = GoogleAuth<JSONClient>

export function getGoogleAuth(account: Account): Auth {
    const auth: Auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: account.email,
            private_key: account.privateKey
        },
        scopes: 'https://www.googleapis.com/auth/drive'
    })

    return auth
}

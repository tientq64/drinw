import { Account } from '../store/types'
import { Auth, getGoogleAuth } from './getGoogleAuth'

export async function getAccessToken(account: Account): Promise<string | undefined> {
    const auth: Auth = getGoogleAuth(account)

    return (await auth.getAccessToken()) ?? undefined
}

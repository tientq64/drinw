import { getAccount } from './getAccount'
import { setCurrentAccount } from './setCurrentAccount'
import { Account } from './types'
import { getState } from './useAppStore'

export function syncCurrentAccount(account: Account): void {
    const currentAccount: Account | undefined = getState().currentAccount
    if (currentAccount === undefined) return

    const latestAccount: Account | undefined = getAccount(account)
    if (latestAccount === undefined) return
    if (latestAccount.email !== currentAccount.email) return

    setCurrentAccount(latestAccount)
}

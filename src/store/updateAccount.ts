import { makeAccount } from '../helpers/makeAccount'
import { syncCurrentAccount } from './syncCurrentAccount'
import { Account } from './types'
import { setState } from './useAppStore'

export function updateAccount(email: string, updateData: Partial<Account>): void {
    setState((draft) => {
        draft.accounts = draft.accounts.map((draftAccount) => {
            if (draftAccount.email === email) {
                return makeAccount({ ...draftAccount, ...updateData })
            }
            return draftAccount
        })
    })

    syncCurrentAccount(email)
}

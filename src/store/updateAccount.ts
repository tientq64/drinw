import { find } from 'lodash-es'
import { Account } from './types'
import { setState } from './useAppStore'

export function updateAccount(account: Account, updateData: Partial<Account>): void {
    setState((draft) => {
        const draftAccount = find(draft.accounts, { email: account.email })
        if (draftAccount === undefined) return
        Object.assign(draftAccount, updateData)
    })
}

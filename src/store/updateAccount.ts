import { find } from 'lodash-es'
import { syncCurrentAccount } from './syncCurrentAccount'
import { Account } from './types'
import { setState } from './useAppStore'

export function updateAccount(account: Account, updateData: Partial<Account>): void {
    if (updateData.title === '') {
        delete updateData.title
    }
    if (updateData.kindName === '') {
        delete updateData.kindName
    }

    setState((draft) => {
        const draftAccount = find(draft.accounts, { email: account.email })
        if (draftAccount === undefined) return

        Object.assign(draftAccount, updateData)
    })

    syncCurrentAccount(account)
}

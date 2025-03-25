import { setState } from './useAppStore'
import { Account } from './types'

export function addAccount(account: Account): void {
    setState((draft) => {
        draft.accounts.push(account)
    })
}

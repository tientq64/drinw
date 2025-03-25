import { setState } from './useAppStore'
import { Account } from './types'

export function setCurrentAccount(currentAccount: Account | undefined): void {
    setState({ currentAccount })
}

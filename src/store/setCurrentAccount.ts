import { Account } from './types'
import { setState } from './useAppStore'

export function setCurrentAccount(currentAccount: Account | undefined): void {
    setState({ currentAccount })
}

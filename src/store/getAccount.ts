import { Account } from './types'
import { getState } from './useAppStore'

export function getAccount(email: string): Account | undefined {
    return getState().accounts.find((account) => account.email === email)
}

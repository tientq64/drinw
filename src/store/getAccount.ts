import { find } from 'lodash-es'
import { Account } from './types'
import { getState } from './useAppStore'

export function getAccount(account: Account): Account | undefined {
    return find(getState().accounts, { email: account.email })
}

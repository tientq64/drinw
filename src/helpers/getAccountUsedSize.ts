import { Account } from '../store/types'
import { getAccountSizeRatio } from './getAccountSizeRatio'

export function getAccountUsedSize(account: Account, ratio?: number): number {
	const usedSize: number = account.driveSize + account.trashSize
	if (ratio === undefined) {
		return usedSize
	}
	return getAccountSizeRatio(usedSize, ratio)
}

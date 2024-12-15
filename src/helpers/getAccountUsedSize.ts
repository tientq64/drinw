import { TOTAL_SIZE } from '../constants/constants'
import { Account } from '../store/useAppStore'
import { getAccountSizeRatio } from './getAccountSizeRatio'

export function getAccountUsedSize(account: Account, ratio?: number): number {
	const usedSize: number = account.driveSize + account.trashSize
	if (ratio === undefined) {
		return usedSize
	}
	return getAccountSizeRatio(usedSize, ratio)
}

import { TOTAL_SIZE } from '../constants/constants'

export function getAccountSizeRatio(size: number, ratio: number = 1): number {
	return (size / TOTAL_SIZE) * ratio
}

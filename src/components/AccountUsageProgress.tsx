import { LinearProgress, LinearProgressProps } from '@mui/material'
import clsx from 'clsx'
import { ReactNode, useMemo } from 'react'
import { TOTAL_SIZE } from '../constants/constants'
import { getAccountSizeRatio } from '../helpers/getAccountSizeRatio'
import { getAccountUsedSize } from '../helpers/getAccountUsedSize'
import { Account } from '../store/useAppStore'
import { formatSize } from '../utils/formatSize'

interface Props extends LinearProgressProps {
	account: Account
	className?: string
}

export function AccountUsageProgress({
	account,
	className,
	classes,
	...progressProps
}: Props): ReactNode {
	const usedSize: number = getAccountUsedSize(account)
	const usedPercent: number = getAccountSizeRatio(usedSize, 100)

	const barColorClass = useMemo<string>(() => {
		if (usedPercent >= 90) return '!bg-rose-500'
		if (usedPercent >= 75) return '!bg-orange-500'
		return '!bg-sky-500'
	}, [usedPercent])

	return (
		<div className={clsx('flex flex-col', className)}>
			<LinearProgress
				{...progressProps}
				className="!h-2 rounded-full"
				classes={{
					...classes,
					bar: clsx('rounded-full', classes?.bar),
					barColorPrimary: clsx(barColorClass, classes?.barColorPrimary),
					colorPrimary: clsx('!bg-zinc-800', classes?.colorPrimary)
				}}
				variant="determinate"
				value={usedPercent}
			/>

			<div className="text-xs">
				<span className="text-zinc-400">
					{formatSize(usedSize)}{' '}
					{account.trashSize > 0 && (
						<span className="text-zinc-500">
							({formatSize(account.driveSize)} drive, {formatSize(account.trashSize)}{' '}
							rác){' '}
						</span>
					)}
					/ {formatSize(TOTAL_SIZE)}
				</span>
			</div>
		</div>
	)
}

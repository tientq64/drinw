import clsx from 'clsx'
import { filesize } from 'filesize'
import { HTMLAttributes, ReactNode } from 'react'
import { getAccountUsedSize } from '../helpers/getAccountUsedSize'
import { Account } from '../store/useAppStore'

interface Props extends HTMLAttributes<HTMLDivElement> {
	account: Account
}

export function AccountUsageText({ account, className, ...props }: Props): ReactNode {
	const usedSize: number = getAccountUsedSize(account)

	return (
		<div {...props} className={clsx('inline-block text-xs', className)}>
			{filesize(usedSize)}
		</div>
	)
}

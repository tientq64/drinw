import clsx from 'clsx'
import { HTMLAttributes, ReactNode, useMemo } from 'react'
import { AccountKind, AccountKindEnum, getAccountKind } from '../constants/accountKinds'

interface AccountKindLabelProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    kind: AccountKind | AccountKindEnum | string | undefined
    hideNone?: boolean
}

export function AccountKindLabel({
    className,
    kind,
    hideNone = false,
    ...props
}: AccountKindLabelProps): ReactNode {
    const accountKind = useMemo<AccountKind | undefined>(() => {
        if (kind === undefined || typeof kind === 'string') {
            return getAccountKind(kind)
        }
        return kind
    }, [kind])

    return (
        <div className={clsx('flex items-center gap-2', className)} {...props}>
            {accountKind === undefined || !accountKind.iconUrl ? (
                <div className="size-4" />
            ) : (
                <img className="h-4" src={accountKind.iconUrl} />
            )}

            {accountKind?.name || hideNone || 'Trống'}
        </div>
    )
}

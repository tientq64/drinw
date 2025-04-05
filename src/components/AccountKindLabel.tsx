import clsx from 'clsx'
import { HTMLAttributes, ReactNode, useMemo } from 'react'
import { AccountKind, AccountKindEnum, getAccountKind } from '../constants/accountKinds'

interface AccountKindLabelProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    kind: AccountKind | AccountKindEnum | string | undefined
}

export function AccountKindLabel({ className, kind, ...props }: AccountKindLabelProps): ReactNode {
    const accountKind = useMemo<AccountKind | undefined>(() => {
        if (kind === undefined) return undefined
        if (typeof kind === 'string') return getAccountKind(kind)
        return kind
    }, [kind])

    return (
        <>
            {accountKind === undefined && <div {...props} className={clsx('h-4', className)}></div>}

            {accountKind !== undefined && (
                <div {...props} className={clsx('flex items-center gap-2', className)}>
                    <img className="h-4" src={accountKind.iconUrl} />

                    {accountKind?.name}
                </div>
            )}
        </>
    )
}

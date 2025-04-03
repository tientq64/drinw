import clsx from 'clsx'
import { ReactNode } from 'react'
import { MaterialIconName } from 'ts-material-icon-name-list/kebab'

interface IconProps {
    className?: string
    name: MaterialIconName
    size?: number
}

export function Icon({ className, name, size = 20 }: IconProps): ReactNode {
    const formatedName: string = name.replace(/-/g, '_')

    return (
        <span
            className={clsx('material-symbols-rounded anticon', className)}
            style={{
                fontSize: size
            }}
        >
            {formatedName}
        </span>
    )
}

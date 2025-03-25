import { Progress } from 'antd'
import { ReactNode, useMemo } from 'react'
import { amber, rose, slate } from 'tailwindcss/colors'
import { totalSize } from '../constants/constants'
import { Account } from '../store/types'
import { formatSize } from '../utils/formatSize'
import { GB } from '../constants/constants'

interface AccountStorageBarProps {
    account: Account
}

export function AccountStorageBar({ account }: AccountStorageBarProps): ReactNode {
    const usedSize: number = account.driveSize + account.trashSize

    const percent: number = Math.floor((usedSize / totalSize) * 100)

    const color: string = useMemo(() => {
        if (usedSize >= 14 * GB) return rose[500]
        if (usedSize >= 12 * GB) return amber[500]
        return slate[500]
    }, [usedSize])

    return (
        <div>
            <Progress
                steps={10}
                percent={percent}
                format={() => (
                    <>
                        {formatSize(usedSize)}
                        {account.trashSize > 0 && (
                            <span className="text-zinc-500">
                                {' '}
                                ({formatSize(account.trashSize)})
                            </span>
                        )}
                    </>
                )}
                strokeColor={color}
            />
        </div>
    )
}

import { useAsyncEffect } from 'ahooks'
import { getAbout } from '../api/getAbout'
import { Account } from '../store/types'
import { updateAccount } from '../store/updateAccount'

const updatedAccountUsageFlags: Record<Account['email'], boolean | undefined> = {}

export function useUpdateUsage(account: Account): void {
    useAsyncEffect(async () => {
        if (updatedAccountUsageFlags[account.email]) return

        updatedAccountUsageFlags[account.email] = true

        const result = await getAbout(account)
        const storageQuota = result.data.storageQuota
        if (storageQuota == null) return

        updateAccount(account, {
            driveSize: Number(storageQuota.usageInDrive),
            trashSize: Number(storageQuota.usageInDriveTrash)
        })
    }, [])
}

import { RouterState } from 'react-router-dom'
import { File } from '../helpers/getGoogleDrive'
import { getAccount } from '../store/getAccount'
import { setBreadcrumbItems } from '../store/setBreadcrumbItems'
import { setCurrentAccount } from '../store/setCurrentAccount'
import { setInTrash } from '../store/setInTrash'
import { Account } from '../store/types'
import { StateLocation } from '../types/types'

export function handleStateChange(state: RouterState): void {
    const location: StateLocation = state.location
    if (location.state == null) return
    if (location.state.currentAccount === undefined) return

    const currentAccount: Account | undefined = getAccount(location.state.currentAccount.email)
    if (currentAccount === undefined) return

    const inTrash: boolean = location.state.inTrash
    const breadcrumbItems: File[] = location.state.breadcrumbItems

    setCurrentAccount(currentAccount)
    setInTrash(inTrash)
    setBreadcrumbItems(breadcrumbItems)
}

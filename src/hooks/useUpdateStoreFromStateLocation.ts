import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { setBreadcrumbItems } from '../store/setBreadcrumbItems'
import { setCurrentAccount } from '../store/setCurrentAccount'
import { setInTrash } from '../store/setInTrash'
import { StateLocation } from '../types/types'

export function useUpdateStoreFromStateLocation(): void {
    const location: StateLocation = useLocation()

    useEffect(() => {
        if (!location.state) return
        setCurrentAccount(location.state.currentAccount)
        setInTrash(location.state.inTrash)
        setBreadcrumbItems(location.state.breadcrumbItems)
    }, [location.state])
}

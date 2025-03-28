import { createHashRouter, Navigate, RouterState, useParams } from 'react-router-dom'
import { AppWindow } from './components/AppWindow'
import { AccountsPage } from './pages/AccountsPage'
import { DrivePage } from './pages/DrivePage'
import { SettingsPage } from './pages/SettingsPage'
import { setBreadcrumbItems } from './store/setBreadcrumbItems'
import { setCurrentAccount } from './store/setCurrentAccount'
import { setInTrash } from './store/setInTrash'
import { StateLocation } from './types/types'

export const router = createHashRouter([
    {
        path: '/',
        element: <AppWindow />,
        children: [
            {
                path: 'accounts',
                element: <AccountsPage />
            },
            {
                path: 'drive/:hash',
                Component: () => <DrivePage key={useParams().hash} />
            },
            {
                path: 'settings',
                element: <SettingsPage />
            },
            {
                index: true,
                element: <Navigate to="accounts" replace />
            }
        ]
    }
])

function handleStateChange(state: RouterState): void {
    const location: StateLocation = state.location
    if (location.state == null) return

    setCurrentAccount(location.state.currentAccount)
    setInTrash(location.state.inTrash)
    setBreadcrumbItems(location.state.breadcrumbItems)
}

router.subscribe(handleStateChange)
handleStateChange(router.state)

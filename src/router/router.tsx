import { createHashRouter, Navigate, useParams } from 'react-router-dom'
import { AppWindow } from '../components/AppWindow'
import { AccountsPage } from '../pages/AccountsPage'
import { DrivePage } from '../pages/DrivePage'
import { SettingsPage } from '../pages/SettingsPage'
import { handleStateChange } from './handleStateChange'

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

router.subscribe(handleStateChange)
handleStateChange(router.state)

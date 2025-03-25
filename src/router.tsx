import { createBrowserRouter, Navigate, useParams } from 'react-router-dom'
import { AppWindow } from './components/AppWindow'
import { AccountsPage } from './pages/AccountsPage'
import { SettingsPage } from './pages/SettingsPage'
import { DrivePage } from './pages/DrivePage'

export const router = createBrowserRouter([
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

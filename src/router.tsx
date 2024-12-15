import { createBrowserRouter, Navigate } from 'react-router'
import { AccountsPage } from './pages/AccountsPage'
import { SettingsPage } from './pages/SettingsPage'
import { DrivePage } from './pages/DrivePage'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: 'accounts',
				element: <AccountsPage />
			},
			{
				path: 'settings',
				element: <SettingsPage />
			},
			{
				path: 'drive',
				element: <DrivePage />
			},
			{
				index: true,
				element: <Navigate to="/accounts" replace />
			}
		]
	}
])

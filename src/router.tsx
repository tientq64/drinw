import { createBrowserRouter, Navigate, useParams } from 'react-router'
import { AccountsPage } from './pages/AccountsPage'
import { SettingsPage } from './pages/SettingsPage'
import { DrivePage } from './pages/DrivePage'
import { Layout } from './layouts/Layout'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
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
				path: 'drive/:randomId?',
				Component: () => <DrivePage key={useParams().randomId} />
			},
			{
				index: true,
				element: <Navigate to="/accounts" replace />
			}
		]
	}
])

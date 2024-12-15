import { ArrowBackRounded, SettingsRounded } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import { ReactNode } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router'

interface Props {
	title?: string
}

export function TopBar({ title }: Props): ReactNode {
	const navigate = useNavigate()
	const settingsPathMatch = useMatch('/settings')

	const canGoBack: boolean = navigation === undefined || navigation.canGoBack

	const handleBackClick = (): void => {
		navigate(-1)
	}

	const handleSettingsClick = (): void => {
		navigate('/settings')
	}

	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<Tooltip title="Quay lại" enterDelay={500}>
					<IconButton disabled={!canGoBack} onClick={handleBackClick}>
						<ArrowBackRounded />
					</IconButton>
				</Tooltip>

				<div className="flex-1">
					{title && <div className="text-lg font-semibold text-center">{title}</div>}
				</div>

				<Tooltip title="Cài đặt">
					<IconButton disabled={settingsPathMatch !== null} onClick={handleSettingsClick}>
						<SettingsRounded />
					</IconButton>
				</Tooltip>
			</Toolbar>
		</AppBar>
	)
}

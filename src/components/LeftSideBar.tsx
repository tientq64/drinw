import {
	AccountBoxRounded,
	DeleteRounded,
	SettingsRounded,
	StorageRounded
} from '@mui/icons-material'
import { Divider, List, ListItemButton, ListItemIcon, ListSubheader } from '@mui/material'
import { ReactNode } from 'react'
import { useMatch, useNavigate } from 'react-router'
import { setIsInTrash } from '../store/setIsInTrash'
import { useAppStore } from '../store/useAppStore'

export function LeftSideBar(): ReactNode {
	const currentAccount = useAppStore((state) => state.currentAccount)
	const isInTrash = useAppStore((state) => state.isInTrash)

	const navigate = useNavigate()
	const accountsPathMatch = useMatch('/accounts')
	const drivePathMatch = useMatch('/drive')
	const settingsPathMatch = useMatch('/settings')

	const handleDriveClick = (): void => {
		setIsInTrash(false)
		navigate('/drive')
	}

	const handleTrashClick = (): void => {
		setIsInTrash(true)
		navigate('/drive')
	}

	return (
		<div className="w-80">
			<List dense disablePadding subheader>
				<ListSubheader className="!leading-9">Điều hướng</ListSubheader>

				<ListItemButton
					selected={accountsPathMatch !== null}
					onClick={() => navigate('/accounts')}
				>
					<ListItemIcon>
						<AccountBoxRounded />
					</ListItemIcon>
					Tài khoản
				</ListItemButton>

				<ListItemButton
					selected={drivePathMatch !== null && !isInTrash}
					disabled={currentAccount === undefined}
					onClick={handleDriveClick}
				>
					<ListItemIcon>
						<StorageRounded />
					</ListItemIcon>
					Ổ đĩa chính
				</ListItemButton>

				<ListItemButton
					selected={drivePathMatch !== null && isInTrash}
					disabled={currentAccount === undefined}
					onClick={handleTrashClick}
				>
					<ListItemIcon>
						<DeleteRounded />
					</ListItemIcon>
					Thùng rác
				</ListItemButton>

				<Divider className="!my-1" />

				<ListItemButton
					selected={settingsPathMatch !== null}
					onClick={() => navigate('/settings')}
				>
					<ListItemIcon>
						<SettingsRounded />
					</ListItemIcon>
					Cài đặt
				</ListItemButton>
			</List>
		</div>
	)
}

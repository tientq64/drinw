import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { AccountUsageProgress } from '../components/AccountUsageProgress'
import { TopBar } from '../components/TopBar'
import { getAccountClientEmailName } from '../helpers/getAccountClientEmailName'
import { Account, useAppStore } from '../store/useAppStore'
import { useNavigate } from 'react-router'
import { CurrentDirsBreadcrumbs } from '../components/CurrentDirsBreadcrumbs'

export function AccountsPage(): ReactNode {
	const accounts = useAppStore((state) => state.accounts)
	const setCurrentAccount = useAppStore((state) => state.setCurrentAccount)
	const pushCurrentDirs = useAppStore((state) => state.pushCurrentDirs)
	const emptyCurrentDirs = useAppStore((state) => state.emptyCurrentDirs)
	const setIsInTrash = useAppStore((state) => state.setIsInTrash)

	const navigate = useNavigate()

	const handleAccountClick = (account: Account): void => {
		const emailName: string = getAccountClientEmailName(account)
		setCurrentAccount(account)
		pushCurrentDirs({
			dirId: 'root',
			dirName: account.title || emailName
		})
		if (account.mainDirId) {
			pushCurrentDirs({
				dirId: account.mainDirId,
				dirName: emailName
			})
		}
		navigate('/drive')
	}

	useEffect(() => {
		setCurrentAccount(undefined)
		emptyCurrentDirs()
		setIsInTrash(false)
	}, [])

	return (
		<Box className="flex flex-col h-full">
			<TopBar title="Đăng nhập"></TopBar>

			<CurrentDirsBreadcrumbs />

			<TableContainer>
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell>STT</TableCell>
							<TableCell width="10%">Tài khoản</TableCell>
							<TableCell width="25%">Tiêu đề</TableCell>
							<TableCell width="10%">Thể loại</TableCell>
							<TableCell width="25%">Bộ lọc</TableCell>
							<TableCell width="30%">Dung lượng sử dụng</TableCell>
						</TableRow>
					</TableHead>

					<TableBody className="select-none cursor-default">
						{accounts.map((account, index) => (
							<TableRow
								key={account.clientEmail}
								hover
								onDoubleClick={() => handleAccountClick(account)}
							>
								<TableCell className="!text-zinc-400">{index + 1}</TableCell>
								<TableCell>{getAccountClientEmailName(account)}</TableCell>
								<TableCell>{account.title}</TableCell>
								<TableCell>{account.kind}</TableCell>
								<TableCell className="!text-zinc-500">
									{account.tiktokUsernameFirstLetter !== undefined && (
										<>
											Khớp với ký tự đầu của username:{' '}
											{account.tiktokUsernameFirstLetter}
										</>
									)}
								</TableCell>
								<TableCell className="!pb-0">
									{account.mainDirId !== undefined && (
										<AccountUsageProgress account={account} />
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

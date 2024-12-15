import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material'
import { ReactNode } from 'react'
import { AccountUsageProgress } from '../components/AccountUsageProgress'
import { TopBar } from '../components/TopBar'
import { getAccountClientEmailName } from '../helpers/getAccountClientEmailName'
import { Account, useAppStore } from '../store/useAppStore'
import { useNavigate } from 'react-router'

export function AccountsPage(): ReactNode {
	const accounts = useAppStore((state) => state.accounts)
	const setCurrentAccount = useAppStore((state) => state.setCurrentAccount)
	const pushCurrentDir = useAppStore((state) => state.pushCurrentDir)

	const navigate = useNavigate()

	const handleAccountClick = (account: Account): void => {
		const emailName: string = getAccountClientEmailName(account)
		setCurrentAccount(account)
		pushCurrentDir({
			dirId: 'root',
			dirName: emailName
		})
		navigate('/drive')
	}

	return (
		<Box className="flex flex-col h-full">
			<TopBar title="Đăng nhập"></TopBar>

			<TableContainer>
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell>Tài khoản</TableCell>
							<TableCell>Tiêu đề</TableCell>
							<TableCell>Thể loại</TableCell>
							<TableCell>Dung lượng sử dụng</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{accounts.map((account) => (
							<TableRow
								key={account.clientEmail}
								hover
								onDoubleClick={() => handleAccountClick(account)}
							>
								<TableCell>{getAccountClientEmailName(account)}</TableCell>
								<TableCell>{account.title}</TableCell>
								<TableCell>{account.kind}</TableCell>
								<TableCell width="30%">
									<AccountUsageProgress account={account} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

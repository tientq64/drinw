import { DeleteRounded, EditRounded, FolderRounded } from '@mui/icons-material'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AccountUsageProgress } from '../components/AccountUsageProgress'
import { ContextMenu } from '../components/ContextMenu'
import { getAccountClientEmailName } from '../helpers/getAccountClientEmailName'
import { addBreadcrumbItem } from '../store/addBreadcrumbItem'
import { emptyBreadcrumbItems } from '../store/emptyBreadcrumbItems'
import { setCurrentAccount } from '../store/setCurrentAccount'
import { setIsInTrash } from '../store/setIsInTrash'
import { Account } from '../store/types'
import { useAppStore } from '../store/useAppStore'

export function AccountsPage(): ReactNode {
	const accounts = useAppStore((state) => state.accounts)

	const navigate = useNavigate()

	const handleAccountClick = (account: Account): void => {
		const emailName: string = getAccountClientEmailName(account)
		setCurrentAccount(account)
		addBreadcrumbItem({
			dirId: 'root',
			dirName: account.title || emailName
		})
		navigate('/drive')
	}

	useEffect(() => {
		setCurrentAccount(undefined)
		emptyBreadcrumbItems()
		setIsInTrash(false)
	}, [])

	return (
		<Box className="flex flex-col h-full">
			<TableContainer>
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell>STT</TableCell>
							<TableCell width="10%">Tài khoản</TableCell>
							<TableCell width="25%">Tiêu đề</TableCell>
							<TableCell width="10%">Thể loại</TableCell>
							<TableCell width="25%">Quy tắc</TableCell>
							<TableCell width="30%">Dung lượng sử dụng</TableCell>
						</TableRow>
					</TableHead>

					<TableBody className="select-none cursor-default">
						{accounts.map((account, index) => (
							<ContextMenu
								key={account.clientEmail}
								menuItems={[
									{
										title: 'Mở',
										icon: <FolderRounded />,
										click: () => handleAccountClick(account)
									},
									{
										divider: true
									},
									{
										title: 'Chỉnh sửa',
										icon: <EditRounded />
									},
									{
										title: 'Xóa',
										icon: <DeleteRounded />,
										color: 'red'
									}
								]}
							>
								{(isOpen) => (
									<TableRow
										className={clsx(isOpen && 'bg-zinc-800')}
										hover
										tabIndex={0}
										onDoubleClick={() => handleAccountClick(account)}
									>
										<TableCell className="!text-zinc-400">
											{index + 1}
										</TableCell>
										<TableCell>{getAccountClientEmailName(account)}</TableCell>
										<TableCell>{account.title}</TableCell>
										<TableCell>{account.kindName}</TableCell>
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
								)}
							</ContextMenu>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{accounts.length === 0 && (
				<div className="py-2 text-center text-zinc-500">Chưa có tài khoản nào</div>
			)}
		</Box>
	)
}

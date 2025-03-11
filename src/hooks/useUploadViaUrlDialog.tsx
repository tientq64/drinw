import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormLabel,
	TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { object, string } from 'yup'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { addUploadItem } from '../store/addUploadItem'
import { Account } from '../store/types'
import { useAppStore } from '../store/useAppStore'

interface UploadViaUrlDialogValues {
	url: string
}

export function useUploadViaUrlDialog() {
	const isSmartUpload = useAppStore((state) => state.isSmartUpload)

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [account, setAccount] = useState<Account | undefined>(undefined)
	const [destDirId, setDestDirId] = useState<string | undefined>(undefined)

	const open = (account?: Account, destDirId?: string): void => {
		setAccount(account)
		setDestDirId(destDirId)
		setIsOpen(true)
	}

	const close = (): void => {
		setIsOpen(false)
		form.resetForm()
	}

	const handleSubmit = ({ url }: UploadViaUrlDialogValues): void => {
		addUploadItem({
			id: nanoid(),
			isSmartUpload,
			status: UploadStatusEnum.Pending,
			account: isSmartUpload ? undefined : account,
			destDirId: isSmartUpload ? undefined : destDirId,
			sourceUrl: url,
			progressSize: 0
		})
		close()
	}

	const form = useFormik<UploadViaUrlDialogValues>({
		initialValues: {
			url: 'https://www.youtube.com/watch?v=HcNg94NvNVE'
		},
		validationSchema: object({
			url: string().required('URL không được để trống').url('URL không hợp lệ')
		}),
		onSubmit: handleSubmit
	})

	const dialog = (
		<Dialog open={isOpen} onClose={close}>
			<form className="w-96" onSubmit={form.handleSubmit}>
				<DialogTitle>Tải lên thông qua URL</DialogTitle>

				<DialogContent>
					<FormControl fullWidth>
						<FormLabel>Nhập URL cần tải lên:</FormLabel>
						<TextField
							{...form.getFieldProps('url')}
							autoFocus
							size="small"
							error={Boolean(form.errors.url)}
							helperText={form.errors.url}
						/>
					</FormControl>
				</DialogContent>

				<DialogActions>
					<Button type="submit">OK</Button>
					<Button onClick={close}>Hủy</Button>
				</DialogActions>
			</form>
		</Dialog>
	)

	return { isOpen, open, dialog }
}

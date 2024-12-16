import { Box, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { ReactNode } from 'react'
import { object, string } from 'yup'
import { TopBar } from '../components/TopBar'
import { useAppStore } from '../store/useAppStore'

interface SettingValues {
	masterEmail: string
}

export function SettingsPage(): ReactNode {
	const masterEmail = useAppStore((state) => state.masterEmail)

	const handleSubmit = (values: SettingValues): void => {
		// console.log(values)
	}

	const formik = useFormik<SettingValues>({
		initialValues: {
			masterEmail
		},
		validationSchema: object({
			masterEmail: string().email('Email không hợp lệ')
		}),
		onSubmit: handleSubmit
	})

	return (
		<Box className="flex flex-col h-full">
			<TopBar title="Cài đặt"></TopBar>

			<div className="flex-1 p-8">
				<form onSubmit={formik.handleSubmit}>
					<TextField
						{...formik.getFieldProps('masterEmail')}
						label="Email tài khoản chính"
						fullWidth
						variant="standard"
						error={Boolean(formik.errors.masterEmail)}
						helperText={
							formik.errors.masterEmail ??
							'Các tài khoản service account sẽ chia sẻ thư mục chính của họ cho tài khoản này.'
						}
					/>
				</form>
			</div>
		</Box>
	)
}

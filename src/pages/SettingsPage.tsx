import {
	Divider,
	FormControl,
	InputLabel,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { ReactNode, useId } from 'react'
import { object, string } from 'yup'
import { FilesViewModeEnum, filesViewModes } from '../constants/filesViewModes'
import { useAppStore } from '../store/useAppStore'

interface SettingValues {
	masterEmail: string
}

export function SettingsPage(): ReactNode {
	const masterEmail = useAppStore((state) => state.masterEmail)
	const filesViewMode = useAppStore((state) => state.filesViewMode)
	const setFilesViewMode = useAppStore((state) => state.setFilesViewMode)

	const filesViewModeLabelId: string = useId()

	const handleSubmit = (values: SettingValues): void => {
		// console.log(values)
	}

	const handleCurrentFilesViewModeChange = (
		event: SelectChangeEvent<FilesViewModeEnum>
	): void => {
		setFilesViewMode(event.target.value as FilesViewModeEnum)
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
		<div className="h-full p-8">
			<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
				<TextField
					{...formik.getFieldProps('masterEmail')}
					label="Email tài khoản chính"
					size="small"
					error={Boolean(formik.errors.masterEmail)}
					helperText={
						formik.errors.masterEmail ??
						'Các tài khoản service account sẽ chia sẻ thư mục chính của họ với tài khoản này.'
					}
				/>

				<FormControl size="small">
					<InputLabel id={filesViewModeLabelId}>Chế độ xem danh sách tập tin</InputLabel>
					<Select
						labelId={filesViewModeLabelId}
						label="Chế độ xem danh sách tập tin"
						value={filesViewMode}
						onChange={handleCurrentFilesViewModeChange}
					>
						{filesViewModes.map((viewMode) => (
							<MenuItem value={viewMode.value}>
								<div className="flex items-center gap-4">
									{viewMode.icon}
									{viewMode.label}
								</div>
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</form>
		</div>
	)
}

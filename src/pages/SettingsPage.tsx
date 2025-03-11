import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { ReactNode, useId } from 'react'
import { object } from 'yup'
import { FilesViewModeEnum, filesViewModes } from '../constants/filesViewModes'
import { masterEmailSchema } from '../constants/validationSchemas'
import { setFilesViewMode } from '../store/setFilesViewMode'
import { useAppStore } from '../store/useAppStore'

interface SettingValues {
	masterEmail: string | undefined
}

export function SettingsPage(): ReactNode {
	const masterEmail = useAppStore((state) => state.masterEmail)
	const filesViewMode = useAppStore((state) => state.filesViewMode)

	const filesViewModeLabelId: string = useId()

	const handleSubmit = (values: SettingValues): void => {
		console.log(values)
	}

	const handleCurrentFilesViewModeChange = (
		event: SelectChangeEvent<FilesViewModeEnum>
	): void => {
		setFilesViewMode(event.target.value as FilesViewModeEnum)
	}

	const form = useFormik<SettingValues>({
		initialValues: {
			masterEmail
		},
		validationSchema: object({
			masterEmail: masterEmailSchema
		}),
		onSubmit: handleSubmit
	})

	return (
		<div className="h-full p-8">
			<form className="flex flex-col gap-4" onSubmit={form.handleSubmit}>
				<TextField
					{...form.getFieldProps('masterEmail')}
					label="Email tài khoản chính"
					size="small"
					error={Boolean(form.errors.masterEmail)}
					helperText={
						form.errors.masterEmail ??
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
							<MenuItem key={viewMode.value} value={viewMode.value}>
								<div className="flex items-center gap-4">
									{viewMode.icon}
									{viewMode.label}
								</div>
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Button type="submit">Lưu</Button>
			</form>
		</div>
	)
}

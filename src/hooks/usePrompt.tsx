import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	FormControl,
	FormLabel,
	TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { ISchema, mixed, object } from 'yup'

interface PromptValues {
	value: string
}

export function usePrompt() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [message, setMessage] = useState<string | undefined>()
	const [defaultValue, setDefaultValue] = useState<string>('')
	const [valueSchema, setValueSchema] = useState<ISchema<any> | undefined>(undefined)
	const resolveRef = useRef<((value: string | null) => void) | undefined>(undefined)

	const open = (
		message: string,
		defaultValue?: string | number | null,
		validationSchema?: ISchema<any>
	): Promise<string | null> => {
		setMessage(message)
		setDefaultValue(String(defaultValue ?? ''))
		setValueSchema(validationSchema)
		setIsOpen(true)
		return new Promise((resolve) => {
			resolveRef.current = resolve
		})
	}

	const close = (): void => {
		setIsOpen(false)
		resolveRef.current = undefined
		form.resetForm()
	}

	const resolve = (value: string | null): void => {
		if (resolveRef.current === undefined) return
		resolveRef.current(value)
		close()
	}

	const handleSubmit = ({ value }: PromptValues): void => {
		resolve(value)
	}

	const handleCancel = (): void => {
		resolve(null)
	}

	const form = useFormik<PromptValues>({
		initialValues: {
			value: defaultValue
		},
		validationSchema: object({
			value: valueSchema ?? mixed()
		}),
		onSubmit: handleSubmit
	})

	useEffect(() => {
		return () => {
			handleCancel()
		}
	}, [])

	const dialog = (
		<Dialog open={isOpen} onClose={handleCancel}>
			<form className="w-96" onSubmit={form.handleSubmit}>
				<DialogContent>
					<FormControl fullWidth>
						<FormLabel>{message}</FormLabel>
						<TextField
							{...form.getFieldProps('value')}
							autoFocus
							size="small"
							error={Boolean(form.errors.value)}
							helperText={form.errors.value}
						/>
					</FormControl>
				</DialogContent>

				<DialogActions>
					<Button type="submit">OK</Button>
					<Button onClick={handleCancel}>Hủy</Button>
				</DialogActions>
			</form>
		</Dialog>
	)

	return { isOpen, open, resolve, dialog }
}

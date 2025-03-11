import { string } from 'yup'

export const masterEmailSchema = string()
	.email('Email chính không hợp lệ')
	.transform((value) => value || undefined)

export const dirNameSchema = string().trim().required('Tên thư mục không được để trống')

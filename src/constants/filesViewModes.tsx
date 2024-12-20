import { GridViewRounded, ViewListRounded } from '@mui/icons-material'
import { ReactElement } from 'react'

export enum FilesViewModeEnum {
	List = 'list',
	Grid = 'grid'
}

export interface FilesViewMode {
	label: string
	value: FilesViewModeEnum
	icon: ReactElement
}

export const filesViewModes: FilesViewMode[] = [
	{
		label: 'Danh sách',
		value: FilesViewModeEnum.List,
		icon: <ViewListRounded />
	},
	{
		label: 'Lưới',
		value: FilesViewModeEnum.Grid,
		icon: <GridViewRounded />
	}
]

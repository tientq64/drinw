import { Divider, List, Paper } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { UploadRow } from './UploadRow'
import { tryStartPendingItems } from '../helpers/tryStartPendingItems'

export function UploadPanel(): ReactNode {
	const uploadItems = useAppStore((state) => state.uploadItems)

	useEffect(() => {
		tryStartPendingItems()
	}, [uploadItems])

	return (
		<Paper
			className="flex flex-col absolute bottom-0 right-8 w-[28rem] h-2/5 !border-b-0 !rounded-b-none"
			variant="outlined"
		>
			<div className="px-4 py-2 font-semibold">Danh sách tải lên</div>
			<Divider />

			<List className="flex-1 overflow-x-hidden">
				{uploadItems.map((uploadItem, index) => (
					<UploadRow key={uploadItem.id} uploadItem={uploadItem} index={index} />
				))}
			</List>
		</Paper>
	)
}

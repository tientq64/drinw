import { Divider, List, ListSubheader } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { tryStartWaitingItems } from '../helpers/tryStartWaitingItems'
import { useAppStore } from '../store/useAppStore'
import { UploadRow } from './UploadRow'

export function UploadPanel(): ReactNode {
	const uploadItems = useAppStore((state) => state.uploadItems)

	useEffect(() => {
		tryStartWaitingItems()
	}, [uploadItems])

	return (
		<div className="w-80">
			<List dense disablePadding subheader>
				<ListSubheader className="!leading-9">Danh sách tải lên</ListSubheader>

				{uploadItems.map((uploadItem, index) => (
					<UploadRow key={uploadItem.id} uploadItem={uploadItem} index={index} />
				))}
			</List>
		</div>
	)
}

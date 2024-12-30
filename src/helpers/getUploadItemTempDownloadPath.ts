import { UploadItem } from '../store/types'

export function getUploadItemTempDownloadPath(uploadItem: UploadItem): string {
	if (uploadItem.fileExt === undefined) {
		throw Error('Không có phần mở rộng tập tin')
	}
	return `temp/${uploadItem.id}.${uploadItem.fileExt}`
}

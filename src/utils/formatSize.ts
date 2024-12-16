import { filesize } from 'filesize'

export function formatSize(size: number | string | null | undefined): string {
	if (size == null) return ''
	return filesize(size, { standard: 'jedec' })
}

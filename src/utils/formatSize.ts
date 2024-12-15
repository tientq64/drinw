import { filesize } from 'filesize'

export function formatSize(size: number): string {
	return filesize(size, { standard: 'jedec' })
}

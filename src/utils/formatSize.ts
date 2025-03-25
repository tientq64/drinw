import { filesize } from 'filesize'

export function formatSize(
    size: number | string | null | undefined,
    round: number = 2
): string | undefined {
    if (size == null) return

    return filesize(size, { standard: 'jedec', round })
}

import { GB, KB, MB, TB } from '../constants/constants'

export function parseFileSize(formatedSize: string | null | undefined): number | undefined {
    if (formatedSize == null) return undefined

    const matches: RegExpExecArray | null = /(\d+(?:\.\d+)?) *(B|KiB|MiB|GiB|TiB)/.exec(
        formatedSize
    )
    if (matches === null) return undefined

    const size: number = Number(matches[1])
    const unit: string = matches[2]

    switch (unit) {
        case 'B':
            return size
        case 'KiB':
            return size * KB
        case 'MiB':
            return size * MB
        case 'GiB':
            return size * GB
        case 'TiB':
            return size * TB
    }
    return undefined
}

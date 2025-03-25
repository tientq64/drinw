import { MB } from '../constants/constants'
import { parseUrl } from './parseUrl'

export function estimateFileSize(url: string): number | undefined {
    const { domain } = parseUrl(url)

    switch (domain) {
        case 'tiktok.com':
            return 4 * MB

        case 'youtube.com':
            return 500 * MB
    }
    return undefined
}

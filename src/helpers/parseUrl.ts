export interface ParsedUrl extends URL {
    domain: string
}

export function parseUrl(url: string): ParsedUrl {
    const urlObj = new URL(url)

    const domain: string = urlObj.hostname.replace(/^www\./, '')

    return {
        ...urlObj,
        domain
    }
}

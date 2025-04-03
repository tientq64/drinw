export interface ParsedUrl extends URL {
    domain: string
    pathnames: string[]
}

export function parseUrl(url: string): ParsedUrl {
    const urlObj = new URL(url)

    const domain: string = urlObj.hostname.replace(/^www\./, '')
    const pathnames: string[] = urlObj.pathname.split('/').filter(Boolean)

    return {
        ...urlObj,
        domain,
        pathnames
    }
}

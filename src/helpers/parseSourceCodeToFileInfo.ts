import { FileInfo } from './fetchFileInfo'
import { ParsedUrl, parseUrl } from './parseUrl'

export async function parseSourceCodeToFileInfo(sourceCode: string): Promise<FileInfo> {
    const parser: DOMParser = new DOMParser()
    const doc: Document = parser.parseFromString(sourceCode, 'text/html')

    const canonicalLink = doc.querySelector<HTMLLinkElement>('link[rel=canonical]')
    const canonical: string | undefined = canonicalLink?.href

    if (canonical !== undefined) {
        const parsedUrl: ParsedUrl = parseUrl(canonical)
        const domain: string = parsedUrl.domain

        switch (true) {
            case /^([a-z]{2}\.)?spankbang\.(com|party)$/.test(domain):
                return parseSpankBang(doc, canonical, parsedUrl)

            case /^pornhub\.com$/.test(domain):
                return parsePornHub(doc, canonical, parsedUrl)
        }
    }

    throw Error('URL không được hỗ trợ')
}

function parseSpankBang(doc: Document, canonical: string, parsedUrl: ParsedUrl): FileInfo {
    const origin: string = 'https://spankbang.com'

    const id: string | undefined = parsedUrl.pathnames.at(0)
    if (id === undefined) {
        throw Error('Không tìm thấy ID video')
    }

    const pageUrl: string = `${origin}/${id}/video`
    parsedUrl = parseUrl(pageUrl)

    const script = doc.querySelector<HTMLScriptElement>('.main-container > script:first-child')
    if (script === null) {
        throw Error('Không tìm thấy thẻ <script>')
    }

    const downloadUrlsJsonRegex: RegExp = /var stream_data = (\{.+?\});/

    const downloadUrlsJsonMatches: RegExpExecArray | null = downloadUrlsJsonRegex.exec(script.text)
    if (downloadUrlsJsonMatches === null) {
        throw Error('Không trích xuất được URL video')
    }

    const downloadUrlsJson: string = downloadUrlsJsonMatches[1].replace(/'/g, '"')
    const downloadUrls: Record<string, [url: string]> = JSON.parse(downloadUrlsJson)

    const orderedQualities: string[] = [
        '4k',
        'm3u8_4k',
        '1080p',
        'm3u8_1080p',
        '720p',
        'm3u8_720p',
        '480p',
        'm3u8_480p',
        '320p',
        'm3u8_320p',
        '240p',
        'm3u8_240p',
        'main'
    ]
    let downloadUrl: string | undefined
    for (const quality of orderedQualities) {
        downloadUrl = downloadUrls[quality]?.[0]
        if (downloadUrl !== undefined) break
    }
    if (downloadUrl === undefined) {
        throw Error('Không tìm được URL video nào')
    }

    const title: string | undefined = doc
        .querySelector('h1.main_content_title')
        ?.textContent?.trim()

    const userEl = doc.querySelector<HTMLAnchorElement>('li.primary_actions_container > a.ul')

    const userId: string | undefined = userEl?.href.split('/').at(-1)
    const userName: string | undefined = userEl?.querySelector('span.name')?.textContent?.trim()

    let userUrl: string | undefined = undefined
    if (userEl?.href !== undefined) {
        userUrl = `${origin}/profile/${userId}`
    }

    return {
        id,
        title,
        uploader_id: userId,
        uploader: userName,
        uploader_url: userUrl,
        webpage_url: pageUrl,
        webpage_url_domain: parsedUrl.domain,
        url: downloadUrl
    }
}

export function parsePornHub(doc: Document, canonical: string, parsedUrl: ParsedUrl): FileInfo {
    // TODO: Chưa lấy được downloadUrl.
    throw Error('PornHub hiện chưa được hỗ trợ')

    // const origin: string = 'https://pornhub.com'

    // const id: string | null = parsedUrl.searchParams.get('viewkey')
    // if (id === null) {
    //     throw Error('Không tìm thấy ID video')
    // }

    // const pageUrl: string = `${origin}/view_video.php?viewkey=${id}`
    // parsedUrl = parseUrl(pageUrl)

    // const title: string | undefined = doc
    //     .querySelector<HTMLSpanElement>('h1.title > span.inlineFree')
    //     ?.textContent?.trim()

    // const userEl = doc.querySelector<HTMLAnchorElement>('a.usernameBadgesWrapper')

    // const userId: string | undefined = userEl?.href.split('/').at(-1)
    // const userName: string | undefined = userEl?.textContent?.trim()

    // let userUrl: string | undefined = undefined
    // if (userEl?.href !== undefined) {
    //     userUrl = `${origin}/model/${userId}`
    // }

    // return {
    //     id,
    //     title,
    //     uploader_id: userId,
    //     uploader: userName,
    //     uploader_url: userUrl,
    //     webpage_url: pageUrl,
    //     webpage_url_domain: parsedUrl.domain
    //     // url: downloadUrl
    // }
}

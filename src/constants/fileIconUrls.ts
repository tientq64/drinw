import { extname } from 'path'
import { File } from '../helpers/getGoogleDrive'
import { folderMime } from './constants'

interface FileIcon {
    match: RegExp
    iconId: number
}

const folderIconUrl: string = makeFlaticonUrl(12081049)
const defaultIconUrl: string = makeFlaticonUrl(15549016)

const fileIcons: FileIcon[] = [
    {
        match: /^(jpe?g|png|gif|webp|svg|avif|jfif|bmp|ico|heic|heif|tif)$/,
        iconId: 4671171
    },
    {
        match: /^(mp3|aac|wav|mid|flac|m4a|ogg|wma)$/,
        iconId: 10544932
    },
    {
        match: /^(mp4|3gp|webm|av1|avi|mkv|m4v|hevc|mov|mpe?g|flv|swf|wmv)$/,
        iconId: 1562715
    },
    {
        match: /^(ttf|otf|eot|woff2?|ufo|fnt)$/,
        iconId: 1158154
    },
    {
        match: /^(txt)$/,
        iconId: 15288650
    },
    {
        match: /^(docx?)$/,
        iconId: 732226
    },
    {
        match: /^(xlsx?)$/,
        iconId: 732220
    },
    {
        match: /^(ppt)$/,
        iconId: 732224
    },
    {
        match: /^(db|mdb|odb|pdb|sql|sqlite)$/,
        iconId: 148825
    },
    {
        match: /^(cmd|sh|ps1|bat)$/,
        iconId: 11743804
    },
    {
        match: /^(gam|gba|nes|pak|rom|sav)$/,
        iconId: 2331852
    },
    {
        match: /^(epub)$/,
        iconId: 2680746
    },
    {
        match: /^(psd)$/,
        iconId: 888872
    },
    {
        match: /^(3dm|3ds|blend|max|obj)$/,
        iconId: 226904
    },
    {
        match: /^(apk|obb)$/,
        iconId: 226770
    },
    {
        match: /^(crx|plugin)$/,
        iconId: 9797539
    },
    {
        match: /^(html?|xhtml)$/,
        iconId: 1051277
    },
    {
        match: /^(css)$/,
        iconId: 732190
    },
    {
        match: /^(js)$/,
        iconId: 8422177
    },
    {
        match: /^(py)$/,
        iconId: 1387537
    },
    {
        match: /^(java|jar)$/,
        iconId: 226777
    },
    {
        match: /^(php)$/,
        iconId: 919830
    },
    {
        match: /^(json)$/,
        iconId: 136525
    },
    {
        match: /^(pdf)$/,
        iconId: 136522
    },
    {
        match: /^(zipx?|rar|tar|7z|tgz|gz|cbr)$/,
        iconId: 12067223
    },
    {
        match: /^(cur)$/,
        iconId: 667380
    },
    {
        match: /^(exe)$/,
        iconId: 18236183
    },
    {
        match: /^(ttrm|ttc)$/,
        iconId: 13029764
    }
]

function makeFlaticonUrl(iconId: number): string {
    const subId: string = String(iconId).slice(0, -3)

    return `https://cdn-icons-png.flaticon.com/24/${subId}/${iconId}.png`
}

export function getFileIconUrl(file: File): string | undefined {
    if (file.name == null) return

    if (file.mimeType === folderMime) {
        return folderIconUrl
    }

    const fileExt: string = extname(file.name).replace(/^\./, '').toLowerCase()
    for (const fileIcon of fileIcons) {
        if (fileIcon.match.test(fileExt)) {
            return makeFlaticonUrl(fileIcon.iconId)
        }
    }

    return defaultIconUrl
}

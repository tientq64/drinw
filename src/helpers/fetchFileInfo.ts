import { Payload } from 'youtube-dl-exec'
import { fetchFileInfoFromPageUrl } from './fetchFileInfoFromPageUrl'
import { parseSourceCodeToFileInfo } from './parseSourceCodeToFileInfo'

export type FileInfo = Partial<Omit<Payload, 'ext'>> & {
    id: string
    ext?: string
    filesize?: number
    estimatedSize?: number
    url?: string
}

export function fetchFileInfo(pageUrl?: string, sourceCode?: string): Promise<FileInfo> {
    if (pageUrl !== undefined) {
        return fetchFileInfoFromPageUrl(pageUrl)
    }
    if (sourceCode !== undefined) {
        return parseSourceCodeToFileInfo(sourceCode)
    }
    throw new Error('Không có URL hoặc mã nguồn')
}

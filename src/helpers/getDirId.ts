import { DriveFile } from './getGoogleDrive'

export function getDirId(dirOrId: DriveFile | string | null | undefined): string | undefined {
    if (dirOrId == null) return undefined
    if (typeof dirOrId === 'string') return dirOrId

    return dirOrId.id ?? undefined
}

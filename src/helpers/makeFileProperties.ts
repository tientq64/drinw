import { pickBy } from 'lodash-es'
import { DriveFileProperties } from './getGoogleDrive'

export type PropertiesData = Omit<DriveFileProperties, 'id'> & {
    fileId?: string
}

export function makeFileProperties(
    data: PropertiesData | undefined
): Partial<DriveFileProperties> | undefined {
    if (data === undefined) return undefined

    return pickBy<DriveFileProperties>({
        id: data.fileId,
        userId: data.userId,
        userName: data.userName,
        userUrl: data.userUrl,
        channelId: data.channelId,
        channelUrl: data.channelUrl,
        pageUrl: data.pageUrl
    })
}

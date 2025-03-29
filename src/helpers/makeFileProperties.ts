import { pickBy } from 'lodash-es'
import { FileProperties } from './getGoogleDrive'

export type PropertiesData = Omit<FileProperties, 'id'> & {
    fileId?: string
}

export function makeFileProperties(
    data: PropertiesData | undefined
): Partial<FileProperties> | undefined {
    if (data === undefined) return undefined

    return pickBy<FileProperties>({
        id: data.fileId,
        userId: data.userId,
        userName: data.userName,
        userUrl: data.userUrl,
        channelId: data.channelId,
        channelUrl: data.channelUrl,
        pageUrl: data.pageUrl
    })
}

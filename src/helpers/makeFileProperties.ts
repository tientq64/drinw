import { getStringBytes } from '../utils/getStringBytes'
import { FileProperties } from './getGoogleDrive'

export type PropertiesData = Omit<FileProperties, 'id'> & {
    fileId?: string
}

const maxFilePropertyKeyValueLength: number = 124

export function makeFileProperties(
    data: PropertiesData | undefined
): Partial<FileProperties> | undefined {
    if (data === undefined) return undefined

    const properties: FileProperties = {
        id: data.fileId,
        userId: data.userId,
        userName: data.userName,
        userUrl: data.userUrl,
        channelId: data.channelId,
        channelUrl: data.channelUrl,
        pageUrl: data.pageUrl
    }
    for (const key in properties) {
        const key2 = key as keyof FileProperties
        const value: string | undefined = properties[key2 as keyof FileProperties]

        if (
            typeof value !== 'string' ||
            value === '' ||
            getStringBytes(key2 + value) > maxFilePropertyKeyValueLength
        ) {
            delete properties[key2]
        }
    }

    return properties
}

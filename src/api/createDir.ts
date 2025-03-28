import { driveFileFields, folderMime } from '../constants/constants'
import { getDirId } from '../helpers/getDirId'
import { Drive, DriveFile, DriveFileProperties, getGoogleDrive } from '../helpers/getGoogleDrive'
import { makeFileDescription } from '../helpers/makeFileDescription'
import { makeFileProperties, PropertiesData } from '../helpers/makeFileProperties'
import { addCurrentFile } from '../store/addCurrentFile'
import { Account } from '../store/types'

export interface CreateDirOptions {
    propertiesData?: PropertiesData
}

export async function createDir(
    account: Account,
    destDirOrId: DriveFile | DriveFile['id'],
    name: string,
    { propertiesData }: CreateDirOptions = {}
): Promise<DriveFile> {
    const destDirId: string | undefined = getDirId(destDirOrId)
    if (destDirId === undefined) {
        throw Error('Id thư mục không tồn tại')
    }

    const description: string | undefined = makeFileDescription(propertiesData)
    const properties: Partial<DriveFileProperties> | undefined = makeFileProperties(propertiesData)

    const drive: Drive = getGoogleDrive(account)

    const result = await drive.files.create({
        fields: driveFileFields,
        requestBody: {
            name,
            parents: [destDirId],
            mimeType: folderMime,
            description,
            properties
        }
    })
    if (result.status !== 200) {
        throw Error('Tạo thư mục thất bại')
    }

    const newDir: DriveFile = result.data
    addCurrentFile(newDir)

    return newDir
}

import { fileFields, folderMime } from '../constants/constants'
import { Drive, File, FileProperties, getGoogleDrive } from '../helpers/getGoogleDrive'
import { makeFile } from '../helpers/makeFile'
import { makeFileDescription } from '../helpers/makeFileDescription'
import { makeFileProperties, PropertiesData } from '../helpers/makeFileProperties'
import { addCurrentFile } from '../store/addCurrentFile'

export interface CreateDirOptions {
    propertiesData?: PropertiesData
}

export async function createDir(
    destDir: File,
    name: string,
    { propertiesData }: CreateDirOptions = {}
): Promise<File> {
    if (destDir.id == null) {
        throw Error('Id thư mục không tồn tại')
    }

    const description: string | undefined = makeFileDescription(propertiesData)
    const properties: Partial<FileProperties> | undefined = makeFileProperties(propertiesData)

    const drive: Drive = getGoogleDrive(destDir.account)

    const result = await drive.files.create({
        fields: fileFields,
        requestBody: {
            name,
            parents: [destDir.id],
            mimeType: folderMime,
            description,
            properties
        }
    })
    if (result.status !== 200) {
        throw Error('Tạo thư mục thất bại')
    }

    const newDir: File = makeFile(result.data, destDir.account)
    addCurrentFile(newDir)

    return newDir
}

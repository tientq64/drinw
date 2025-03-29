import { fileFields } from '../constants/constants'
import { Drive, File, getGoogleDrive } from '../helpers/getGoogleDrive'
import { makeFile } from '../helpers/makeFile'
import { replaceCurrentFile } from '../store/replaceCurrentFile'

export async function updateFile(file: File, updateData: Partial<File>): Promise<File> {
    if (file.id == null) return file

    const drive: Drive = getGoogleDrive(file.account)

    const result = await drive.files.update({
        fileId: file.id,
        fields: fileFields,
        requestBody: updateData
    })

    const updatedFile: File = makeFile(result.data, file.account)
    replaceCurrentFile(updatedFile)

    return updatedFile
}

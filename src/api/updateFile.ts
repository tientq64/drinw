import { fileFields } from '../constants/constants'
import { Drive, File, getGoogleDrive } from '../helpers/getGoogleDrive'
import { makeFile } from '../helpers/makeFile'
import { getCurrentFile } from '../store/getCurrentFile'
import { replaceCurrentFile } from '../store/replaceCurrentFile'

export async function updateFile(file: File, updateData: Partial<File>): Promise<File> {
    if (file.id == null) return file

    const drive: Drive = getGoogleDrive(file.account)
    const updateToken: string = file.updateToken
    let updatedFile: File

    try {
        replaceCurrentFile({ ...file, ...updateData })

        const result = await drive.files.update({
            fileId: file.id,
            fields: fileFields,
            requestBody: updateData
        })

        updatedFile = makeFile(result.data, file.account)
        replaceCurrentFile(updatedFile)
    } catch (error) {
        const latestFile: File | undefined = getCurrentFile(file.id)

        if (latestFile !== undefined && latestFile?.updateToken === updateToken) {
            replaceCurrentFile(file)
        }
        throw error
    }

    return updatedFile
}

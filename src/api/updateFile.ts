import { driveFileFields } from '../constants/constants'
import { Drive, DriveFile, getGoogleDrive } from '../helpers/getGoogleDrive'
import { replaceCurrentFile } from '../store/replaceCurrentFile'
import { Account } from '../store/types'
import { getState } from '../store/useAppStore'

export async function updateFile(
    account: Account,
    file: DriveFile,
    updateData: Partial<DriveFile>
): Promise<DriveFile> {
    if (file.id == null) return file

    const drive: Drive = getGoogleDrive(account)

    const result = await drive.files.update({
        fileId: file.id,
        fields: driveFileFields,
        requestBody: updateData
    })

    const updatedFile: DriveFile = result.data
    replaceCurrentFile(updatedFile)

    return updatedFile
}

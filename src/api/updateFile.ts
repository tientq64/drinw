import { driveFileFields } from '../constants/constants'
import { Drive, DriveFile, getGoogleDrive } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'

export async function updateFile(
    account: Account,
    file: DriveFile,
    updateData: DriveFile
): Promise<DriveFile> {
    if (file.id == null) return file

    const drive: Drive = getGoogleDrive(account)

    const result = await drive.files.update({
        fileId: file.id,
        fields: driveFileFields,
        requestBody: updateData
    })

    return result.data
}

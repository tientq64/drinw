import { File, getGoogleDrive } from '../helpers/getGoogleDrive'
import { removeCurrentFile } from '../store/removeCurrentFile'
import { Account } from '../store/types'
import { getState } from '../store/useAppStore'

export async function emptyTrash(account: Account): Promise<void> {
    const drive = getGoogleDrive(account)

    const currentFiles: File[] = getState().currentFiles
    removeCurrentFile(currentFiles.map((file) => file.id))

    await drive.files.emptyTrash()
}

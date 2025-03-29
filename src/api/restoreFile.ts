import { File } from '../helpers/getGoogleDrive'
import { updateFile } from './updateFile'

export function restoreFile(file: File): Promise<File> {
    return updateFile(file, { trashed: false })
}

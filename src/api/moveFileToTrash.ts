import { File } from '../helpers/getGoogleDrive'
import { updateFile } from './updateFile'

export function moveFileToTrash(file: File): Promise<File> {
    return updateFile(file, { trashed: true })
}

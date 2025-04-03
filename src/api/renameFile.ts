import { File } from '../helpers/getGoogleDrive'
import { updateFile } from './updateFile'

export function renameFile(file: File, newName: string): Promise<File> {
    return updateFile(file, { name: newName })
}

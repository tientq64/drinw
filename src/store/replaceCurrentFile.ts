import { File } from '../helpers/getGoogleDrive'
import { addCurrentFile } from './addCurrentFile'
import { removeCurrentFile } from './removeCurrentFile'

export function replaceCurrentFile(newFile: File): void {
    removeCurrentFile(newFile.id)
    addCurrentFile(newFile)
}

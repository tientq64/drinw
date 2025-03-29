import { folderMime } from '../constants/constants'
import { File } from './getGoogleDrive'

export function checkFileIsDir(file: File): boolean {
    return file.mimeType === folderMime
}

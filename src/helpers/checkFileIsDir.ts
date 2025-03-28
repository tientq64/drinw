import { folderMime } from '../constants/constants'
import { DriveFile } from './getGoogleDrive'

export function checkFileIsDir(file: DriveFile): boolean {
    return file.mimeType === folderMime
}

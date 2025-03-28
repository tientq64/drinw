import { getCurrentDir } from '../helpers/getCurrentDir'
import { DriveFile } from '../helpers/getGoogleDrive'

export function useCurrentDir(): DriveFile | undefined {
    return getCurrentDir()
}

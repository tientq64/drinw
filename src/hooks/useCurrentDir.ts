import { getCurrentDir } from '../helpers/getCurrentDir'
import { File } from '../helpers/getGoogleDrive'

export function useCurrentDir(): File | undefined {
    return getCurrentDir()
}

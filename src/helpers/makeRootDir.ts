import { folderMime, rootDirId } from '../constants/constants'
import { Account } from '../store/types'
import { File } from './getGoogleDrive'

export function makeRootDir(account: Account): File {
    return {
        id: rootDirId,
        name: 'Root',
        mimeType: folderMime,
        trashed: false,
        account
    }
}

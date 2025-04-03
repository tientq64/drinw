import { folderMime, rootDirId } from '../constants/constants'
import { Account } from '../store/types'
import { File } from './getGoogleDrive'
import { makeFile } from './makeFile'

export function makeRootDir(account: Account): File {
    return makeFile(
        {
            id: rootDirId,
            name: 'Root',
            mimeType: folderMime
        },
        account
    )
}

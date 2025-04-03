import { folderMime } from '../constants/constants'
import { Account } from '../store/types'
import { getAccountEmailName } from './getAccountEmailName'
import { File } from './getGoogleDrive'
import { makeFile } from './makeFile'

export function makeMainDir(account: Account): File {
    return makeFile(
        {
            id: account.mainDirId,
            name: getAccountEmailName(account.email),
            mimeType: folderMime,
            trashed: false
        },
        account
    )
}

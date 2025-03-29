import { folderMime } from '../constants/constants'
import { Account } from '../store/types'
import { getAccountEmailName } from './getAccountEmailName'
import { File } from './getGoogleDrive'

export function makeMainDir(account: Account): File {
    return {
        id: account.mainDirId,
        name: getAccountEmailName(account.email),
        mimeType: folderMime,
        trashed: false,
        webViewLink: `https://drive.google.com/drive/folders/${account.mainDirId}`,
        account: account
    }
}

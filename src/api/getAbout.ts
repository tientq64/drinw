import { drive_v3 } from 'googleapis'
import { GaxiosPromise } from 'googleapis/build/src/apis/abusiveexperiencereport'
import { getGoogleDrive } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'

export type DriveAbout = drive_v3.Schema$About

export function getAbout(account: Account): GaxiosPromise<DriveAbout> {
    const drive = getGoogleDrive(account)

    return drive.about.get({
        fields: 'storageQuota(usageInDrive,usageInDriveTrash)'
    })
}

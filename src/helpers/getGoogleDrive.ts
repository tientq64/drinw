import { drive_v3, google } from 'googleapis'
import { Account } from '../store/types'
import { getGoogleAuth } from './getGoogleAuth'

export type Drive = drive_v3.Drive
export type DriveFileList = drive_v3.Schema$FileList

export interface DriveFileProperties {
    id?: string
    userId?: string
    userName?: string
    userUrl?: string
    channelId?: string
    channelUrl?: string
    pageUrl?: string
}

export type DriveFile = drive_v3.Schema$File & {
    properties?: DriveFileProperties | null
}

export function getGoogleDrive(account: Account): Drive {
    const auth = getGoogleAuth(account)
    const drive = google.drive({
        version: 'v3',
        auth
    })
    return drive
}

import { drive_v3, google } from 'googleapis'
import { Account } from '../store/types'
import { getGoogleAuth } from './getGoogleAuth'

export type Drive = drive_v3.Drive
export type DriveFile = drive_v3.Schema$File
export type DriveFileList = drive_v3.Schema$FileList

export interface FileProperties {
    id?: string
    userId?: string
    userName?: string
    userUrl?: string
    channelId?: string
    channelUrl?: string
    pageUrl?: string
}

export type File = Omit<DriveFile, 'properties'> & {
    properties?: FileProperties | null
    readonly account: Account
    updateToken: string
}

export type FileList = {
    files?: File[]
    nextPageToken?: string
    incompleteSearch?: boolean
}

export function getGoogleDrive(account: Account): Drive {
    const auth = getGoogleAuth(account)

    const drive = google.drive({
        version: 'v3',
        auth
    })

    return drive
}

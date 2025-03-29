export const KB: number = 1024
export const MB: number = 1024 * KB
export const GB: number = 1024 * MB
export const TB: number = 1024 * GB

export const totalSize: number = 15 * GB
export const maxMultipartUploadSize: number = 5 * MB
export const maxSafeMultipartUploadSize: number = maxMultipartUploadSize - 256 * KB

export const folderMime: string = 'application/vnd.google-apps.folder'
export const rootDirId: string = 'root'

export const fileFields: string =
    'id,name,mimeType,size,createdTime,description,trashed,thumbnailLink,webViewLink,iconLink,imageMediaMetadata(width,height),videoMediaMetadata(width,height,durationMillis),parents,properties'

export const driveMultipartUploadUrl: string = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=${fileFields}`

export const driveResumableUploadUrl: string = `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=${fileFields}`

export const youtubeDlDownloadFormat: string = 'bv*+ba/b'

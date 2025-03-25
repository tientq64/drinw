export const KB: number = 1024
export const MB: number = 1024 * KB
export const GB: number = 1024 * MB
export const TB: number = 1024 * GB

export const folderMime: string = 'application/vnd.google-apps.folder'

export const totalSize: number = 15 * GB
export const safeMaxMultipartUploadSize: number = 4.9 * MB

export const driveFileFields: string =
    'id,name,mimeType,size,createdTime,description,trashed,thumbnailLink,webViewLink,iconLink,imageMediaMetadata(width,height),videoMediaMetadata(width,height,durationMillis),parents,properties'

export const driveMultipartUploadUrl: string = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=${driveFileFields}`

export const driveResumableUploadUrl: string = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=${driveFileFields}`

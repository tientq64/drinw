import { readdir } from 'fs-extra'
import { addUploadItem } from '../store/addUploadItem'
import { File } from './getGoogleDrive'
import { makeUploadItem, UploadItem } from './makeUploadItem'

interface Options {
    localDirPath: string
    destDir: File
}

export async function addLocalDirPathToUploadQueue({
    localDirPath,
    destDir
}: Options): Promise<UploadItem> {
    const uploadItem: UploadItem = makeUploadItem({
        localDirPath,
        destDir
    })
    addUploadItem(uploadItem)

    const basePaths: string[] = await readdir(localDirPath, {
        recursive: true,
        encoding: 'utf8'
    })
    console.log(basePaths)

    return uploadItem
}

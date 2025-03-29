import { addLocalFilePathToUploadQueue } from './addLocalFilePathToUploadQueue'
import { File } from './getGoogleDrive'
import { showFilePicker } from './showFilePicker'
import { tryStartUploadFromQueue } from './tryStartUploadFromQueue'

export function chooseLocalFileToUpload(destDir: File): void {
    const filePaths: string[] | undefined = showFilePicker('Chọn các tệp cần tải lên', [
        'openFile',
        'multiSelections'
    ])
    if (filePaths === undefined) return

    for (const filePath of filePaths) {
        addLocalFilePathToUploadQueue({ localFilePath: filePath, destDir })
    }
    tryStartUploadFromQueue()
}

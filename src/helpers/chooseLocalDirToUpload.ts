import { addLocalDirToQueue } from './addLocalDirToQueue'
import { File } from './getGoogleDrive'
import { showFilePicker } from './showFilePicker'
import { tryStartUploadFromQueue } from './tryStartUploadFromQueue'

export function chooseLocalDirToUpload(destDir: File): void {
    const dirPaths: string[] | undefined = showFilePicker('Chọn các thư mục cần tải lên', [
        'openDirectory',
        'multiSelections'
    ])
    if (dirPaths === undefined) return

    for (const dirPath of dirPaths) {
        addLocalDirToQueue({ localDirPath: dirPath, destDir })
    }
    tryStartUploadFromQueue()
}

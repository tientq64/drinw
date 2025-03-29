import { uniqBy } from 'lodash-es'
import { checkFileBelongToCurrentDir } from './checkFileBelongToCurrentDir'
import { checkFileIsDir } from './checkFileIsDir'
import { File } from './getGoogleDrive'

export function formatFileList(files: File[]): File[] {
    let formatedFiles: File[] = files.filter((file) => {
        return checkFileBelongToCurrentDir(file)
    })

    formatedFiles = uniqBy(formatedFiles, 'id')

    formatedFiles.sort((fileA, fileB) => {
        const isDirA: boolean = checkFileIsDir(fileA)
        const isDirB: boolean = checkFileIsDir(fileB)
        if (isDirA !== isDirB) {
            return isDirA ? -1 : 1
        }
        const createdTimeA: number = new Date(fileA.createdTime ?? 0).getTime()
        const createdTimeB: number = new Date(fileB.createdTime ?? 0).getTime()
        return createdTimeB - createdTimeA
    })

    return formatedFiles
}

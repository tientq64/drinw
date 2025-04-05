import { checkFileIsDir } from '../helpers/checkFileIsDir'
import { File } from '../helpers/getGoogleDrive'
import { replaceCurrentFile } from '../store/replaceCurrentFile'
import { getState } from '../store/useAppStore'
import { updateFile } from './updateFile'

export async function restoreFile(file: File): Promise<File> {
    const updatedFile: File = await updateFile(file, { trashed: false })

    const removeChildFiles = (parentId: File['id']) => {
        if (parentId == null) return

        for (const currentFile of getState().currentFiles) {
            if (currentFile.parents == null) continue
            if (!currentFile.parents.includes(parentId)) continue
            if (currentFile.id == null) continue
            if (currentFile.id === parentId) continue

            replaceCurrentFile({ ...currentFile, trashed: false })

            if (checkFileIsDir(currentFile)) {
                removeChildFiles(currentFile.id)
            }
        }
    }
    removeChildFiles(updatedFile.id)

    return updatedFile
}

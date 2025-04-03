import { File } from '../helpers/getGoogleDrive'
import { getState } from './useAppStore'

export function getCurrentFile(id: string): File | undefined {
    return getState().currentFiles.find((file) => {
        return file.id === id
    })
}

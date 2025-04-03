import { emptyDir } from 'fs-extra'

export function cleanUpTempDir(): Promise<void> {
    return emptyDir('temp')
}

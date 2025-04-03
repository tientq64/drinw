import { exec } from 'child_process'
import { platform } from 'os'

export function openWithFileManager(path: string | undefined): void {
    if (typeof path !== 'string') return

    const windowsPath: string = path.replace(/\//g, '\\')

    switch (platform()) {
        case 'win32':
            exec(`explorer /select,"${windowsPath}"`)
            break

        case 'darwin':
            exec(`open -R "${path}"`)
            break

        case 'linux':
            exec(`xdg-open "$(dirname "${path}")"`)
            break
    }
}

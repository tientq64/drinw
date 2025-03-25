import { exec } from 'child_process'
import { platform } from 'os'

export function openWithBrowser(url: string | null | undefined): void {
    if (typeof url !== 'string') return

    switch (platform()) {
        case 'win32':
            exec(`start ${url}`)
            break

        case 'darwin':
            exec(`open ${url}`)
            break

        case 'linux':
            exec(`xdg-open ${url}`)
            break
    }
}

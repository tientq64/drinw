import { ipcRenderer } from 'electron'
import { setIsMaximized } from '../store/setIsMaximized'

export function init(): void {
    ipcRenderer.on('isMaximized', (_, isMaximized) => {
        setIsMaximized(isMaximized)
    })
}

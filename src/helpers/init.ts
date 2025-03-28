import { ipcRenderer } from 'electron'
import { setIsMaximized } from '../store/setIsMaximized'

export function init(): void {
    ipcRenderer.on('maximize', (_, isMaximized) => {
        setIsMaximized(isMaximized)
    })

    setIsMaximized(ipcRenderer.sendSync('isMaximized'))
}

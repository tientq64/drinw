import localeVi from 'antd/locale/vi_VN'
import { ipcRenderer } from 'electron'
import { setIsMaximized } from '../store/setIsMaximized'

if (localeVi.Modal) {
    localeVi.Modal.okText = 'OK'
}

ipcRenderer.on('maximize', (_, isMaximized) => {
    setIsMaximized(isMaximized)
})

setIsMaximized(ipcRenderer.sendSync('isMaximized'))

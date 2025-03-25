const { app, BrowserWindow, ipcMain, dialog } = require('electron')

;(async function () {
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    await app.whenReady()

    const win = new BrowserWindow({
        width: 1366,
        height: 768,
        icon: 'src/assets/images/icon-256.png',
        backgroundColor: '#18181b',
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#18181b',
            symbolColor: '#fafafa'
        },
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true
        }
    })

    win.on('maximize', () => {
        win.webContents.send('isMaximized', true)
    })
    win.on('unmaximize', () => {
        win.webContents.send('isMaximized', false)
    })

    ipcMain.on('chooseLocalFileToUpload', (event) => {
        let paths = dialog.showOpenDialogSync(win, {
            title: 'Tải lên các tệp hoặc thư mục',
            properties: ['openFile', 'multiSelections']
        })
        if (paths !== undefined) {
            paths &&= paths.map((path) => path.replaceAll(/\\/g, '/'))
        }
        event.returnValue = paths
    })

    win.maximize()
    win.loadURL('http://localhost:5500')
})()

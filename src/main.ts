import { app, BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron'

async function appReady(): Promise<void> {
    const win: BrowserWindow = new BrowserWindow({
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
            spellcheck: false,
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true
        }
    })

    win.on('maximize', () => {
        win.webContents.send('maximize', true)
    })
    win.on('unmaximize', () => {
        win.webContents.send('maximize', false)
    })

    ipcMain.on('isMaximized', (event: IpcMainEvent) => {
        event.returnValue = win.isMaximized()
    })

    ipcMain.on('chooseLocalFileToUpload', (event: IpcMainEvent) => {
        let paths = dialog.showOpenDialogSync(win, {
            title: 'Tải lên các tệp hoặc thư mục',
            properties: ['openFile', 'multiSelections']
        })
        if (paths !== undefined) {
            paths = paths.map((path) => path.replace(/\\/g, '/'))
        }
        event.returnValue = paths
    })

    ipcMain.on('setBadgeCount', (event: IpcMainEvent, count: number) => {
        const succeeded: boolean = app.setBadgeCount(count)
        event.returnValue = succeeded
    })

    win.maximize()

    if (!app.isPackaged && process.env.ELECTRON_RENDERER_URL) {
        win.loadURL(process.env.ELECTRON_RENDERER_URL)
    } else {
        win.loadFile('./out/index.html')
    }
}

app.on('before-quit', (event) => {
    event.preventDefault()
    app.exit()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(appReady)

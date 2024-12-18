;(async function () {
	const { app, BrowserWindow } = require('electron')

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})

	await app.whenReady()

	const win = new BrowserWindow({
		icon: 'src/assets/images/icon-256.png',
		backgroundColor: '#18181b',
		autoHideMenuBar: true,
		titleBarStyle: 'hidden',
		titleBarOverlay: {
			color: '#18181b',
			symbolColor: '#f9fafb'
		},
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webviewTag: true
		}
	})
	win.maximize()
	win.loadURL('http://localhost:5500')
})()

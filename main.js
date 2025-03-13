const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

let mainWindow
app.whenReady().then(() => {
	Menu.setApplicationMenu(null);

	mainWindow = new BrowserWindow({
		width: 400,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		}
	});

	mainWindow.loadFile(path.join(__dirname, 'index.html'))
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})
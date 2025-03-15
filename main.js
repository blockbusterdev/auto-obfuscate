const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const { readFile, saveFile } = require("./js/file")

let mainWindow	//Window handler

//Processor to initially render app
app.whenReady().then(() => {
	Menu.setApplicationMenu(null);

	mainWindow = new BrowserWindow({
		width: 500,
		height: 450,
		resizable: false, // Disables window resizing (removes maximize button)
		minimizable: false, // Removes the minimize button
		maximizable: false, // Removes the maximize button
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false, // ✅ Disable context isolation to allow require()
		}
	});

	mainWindow.loadFile(path.join(__dirname, 'index.html'))
})

// Listen for open file-input button click event from renderer
ipcMain.on("to-open-file-input", async (event) => {
	const result = await dialog.showOpenDialog({
		title: "Select a File",
		properties: ["openFile"], // Allow only file selection
		filters: [{ name: "GPC files", extensions: ["gpc", "cpp", "txt"] }] // ✅ Restrict to .txt files
	})

	// Send selected file path back to parsing processor
	if (!result.canceled && result.filePaths.length > 0) {
		event.sender.send("selected-file", result.filePaths[0]); // Send first selected file path
	}
})

// ✅ Listen for read-file request and execute readFile function
ipcMain.on("read-file", async (event, path) => readFile(event, path))

// ✅ Listen for save-file request and execute saveFile function
ipcMain.on("save-file", async (event, data) => saveFile(event, data))

//Processor to quit app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})
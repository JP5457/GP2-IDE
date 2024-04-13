const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");
const fs = require("node:fs");
const { eventNames } = require("node:process");

///home/bigjimmy/Desktop/DIS/GP2/programs/graphs/cycle-4.host

async function handleFileOpen() {
	const { canceled, filePaths } = await dialog.showOpenDialog({});
	if (!canceled) {
		return filePaths[0];
	}
}

async function handleFileRead(fileName) {
	console.log(fileName);
	try {
		const data = await fs.readFileSync(fileName, {
			encoding: "utf8",
		});
		return data;
	} catch (err) {
		return err;
	}
}

function createWindow() {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	mainWindow.webContents.openDevTools();

	ipcMain.on("saveFileText", (event, fileName, text) => {
		const webContents = event.sender;
		console.log(text);
		fs.writeFile(fileName, text, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	});

	mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
	ipcMain.handle("openFile", handleFileOpen);

	createWindow();

	ipcMain.handle("readFile", async (event, fileName) => {
		console.log(fileName);
		const result = await handleFileRead(fileName);
		return result;
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

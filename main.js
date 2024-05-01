const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");
const fs = require("node:fs");
const { eventNames } = require("node:process");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

var projectDir = "";

async function handleFileOpen() {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ["openDirectory"],
	});
	if (!canceled) {
		projectDir = filePaths[0];
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

async function handleProgramRun(gp2FileName, hostFileName) {
	const result = await exec("gp2c " + gp2FileName + " " + hostFileName);
	return result;
}

async function handleDirRead(dirName) {
	console.log(dirName);
	try {
		const data = await fs.readdirSync(dirName);
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

	ipcMain.on("saveFileText", (event, fileName, text) => {
		const webContents = event.sender;
		fs.writeFile(fileName, text, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	});

	mainWindow.loadFile("main.html");
}

app.whenReady().then(() => {
	ipcMain.handle("openFile", handleFileOpen);

	createWindow();

	ipcMain.handle("readFile", async (event, fileName) => {
		const result = await handleFileRead(fileName);
		return result;
	});

	ipcMain.handle("readDirectory", async (event, dirName) => {
		const result = await handleDirRead(dirName);
		return result;
	});

	ipcMain.handle("programRun", async (event, gp2FileName, hostFileName) => {
		const result = await handleProgramRun(gp2FileName, hostFileName);
		return result.stdout;
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

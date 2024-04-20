const { contextBridge, ipcRenderer } = require("electron/renderer");

console.log("bash");

contextBridge.exposeInMainWorld("electronAPI", {
	openFile: () => ipcRenderer.invoke("openFile"),
	saveFileText: (fileName, text) =>
		ipcRenderer.send("saveFileText", fileName, text),
	readFile: (fileName) => ipcRenderer.invoke("readFile", fileName),
	readDirectory: (dirName) => ipcRenderer.invoke("readDirectory", dirName),
	runGp2: (gp2FileName, hostFileName) =>
		ipcRenderer.invoke("programRun", gp2FileName, hostFileName),
});

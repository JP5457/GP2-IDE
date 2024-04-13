const { contextBridge, ipcRenderer } = require("electron/renderer");

console.log("bash");

contextBridge.exposeInMainWorld("electronAPI", {
	openFile: () => ipcRenderer.invoke("openFile"),
	saveFileText: (fileName, text) =>
		ipcRenderer.send("saveFileText", fileName, text),
	readFile: (fileName) => ipcRenderer.invoke("readFile", fileName),
});

/*
contextBridge.exposeInMainWorld("electronAPI", {
	saveFileText: (fileName, text) =>
		ipcRenderer.send("saveFileText", fileName, text),
});
*/

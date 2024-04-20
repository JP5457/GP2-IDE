const btn = document.getElementById("openProject");

function createOpenButton(file, filePath) {
	button = document.createElement("p");
	button.innerHTML = file;
	button.addEventListener("click", async () => {
		openEditor(filePath + "/" + file);
	});
	document.getElementById("files").appendChild(button);
}

function createUpButton(filePath) {
	button = document.createElement("p");
	button.innerHTML = "..";
	paths = filePath.split("/");
	x = "";
	while (x == "") {
		x = paths.pop();
	}
	newpath = "";
	paths.forEach((path) => {
		newpath = newpath + path + "/";
	});
	newpath = newpath.substring(0, newpath.length - 1);
	button.addEventListener("click", async () => {
		openFolder(newpath);
	});
	document.getElementById("files").appendChild(button);
}

async function openFolder(filePath) {
	var files = await window.electronAPI.readDirectory(filePath);
	console.log(files);
	var old = document.getElementById("fileOpener");
	filesOld = document.getElementById("files");
	while (filesOld.firstChild) {
		filesOld.removeChild(filesOld.firstChild);
	}
	createUpButton(filePath);
	files.forEach((item) => createOpenButton(item, filePath));
}

btn.addEventListener("click", async () => {
	var filePath = await window.electronAPI.openFile();
	console.log(filePath);
	openFolder(filePath);
});

async function loadFile(fileName, editor) {
	fileText = await window.electronAPI.readFile(fileName);
	console.log(fileText);
	editor.contentWindow.postMessage(fileText, "*");
}

function openEditor(file) {
	console.log(file);
	if (file.slice(-5) == ".rule") {
		editor = document.getElementById("rule");
		editor.style.display = "block";
		document.getElementById("rule").style.display = "block";
		document.getElementById("graph").style.display = "none";
		loadFile(file, editor);
	} else if (file.slice(-5) == ".host") {
		editor = document.getElementById("graph");
		editor.style.display = "block";
		document.getElementById("graph").style.display = "block";
		document.getElementById("rule").style.display = "none";
		document.getElementById("host").innerHTML = file;
		loadFile(file, editor);
	} else if (file.slice(-4) == ".gp2") {
		console.log("hmmm");
		document.getElementById("program").innerHTML = file;
	} else {
		openFolder(file);
	}
}

function setUpFrame() {
	console.log("wow");
}

const btn = document.getElementById("btn");
const filePathElement = document.getElementById("filePath");
const fileInput = document.getElementById("fileName");

btn.addEventListener("click", async () => {
	const fileName = fileInput.value;
	const filePath = await window.electronAPI.readFile(fileName);
	filePathElement.innerText = filePath;
});

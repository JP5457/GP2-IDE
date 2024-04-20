const runButton = document.getElementById("run");

runButton.addEventListener("click", async () => {
	var program = document.getElementById("program").innerHTML;
	var host = document.getElementById("host").innerHTML;
	var result = await window.electronAPI.runGp2(program, host);
	console.log(result);
});

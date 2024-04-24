const runButton = document.getElementById("run");

runButton.addEventListener("click", async () => {
	var program = document.getElementById("program").innerHTML;
	var host = document.getElementById("host").innerHTML;
	var result = await window.electronAPI.runGp2(program, host);
	console.log(result);
	result = result.split(/\r?\n/);
	log = "";
	result.forEach((element) => {
		log = log + element + "<br>";
	});
	document.getElementById("result").innerHTML = log;
});

var html = [];
html.push(' <embed type="text/html" src="grape/build/rule/index.html">');
var target = document.getElementById("opened_editor");
target.innerHTML = html.join("");
target.style.display = "block";

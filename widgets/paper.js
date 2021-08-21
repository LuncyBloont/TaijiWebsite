(function () {
	var target = document.getElementById("paper_js");
	target.className += " paper";
	
	var script = document.createElement("script");
	script.src = "js/listView.js";
	target.appendChild(script);
	
	var iframe = document.createElement("iframe");
	iframe.src = "widgets/paper.html";
	target.appendChild(iframe);
	iframe.addEventListener("load", (function () {
		target.innerHTML = iframe.contentWindow.document.body.innerHTML;
		renderList("paper", paper_content);
	}), false);
	
})();
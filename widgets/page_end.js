(function () {
	var target = document.getElementById("page_end_js");
	
	var iframe = document.createElement("iframe");
	iframe.src = "widgets/page_end.html";
	target.appendChild(iframe);
	iframe.addEventListener("load", (function () {
		target.innerHTML = iframe.contentWindow.document.body.innerHTML;
	}), false);
})();
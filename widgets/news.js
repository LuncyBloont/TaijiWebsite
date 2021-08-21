(function () {
	var target = document.getElementById("news_js");
	target.className += " news_panel";
	
	var script = document.createElement("script");
	script.src = "js/listView.js";
	target.appendChild(script);
	script = document.createElement("script");
	script.src = "tools/format/news_page_list.js";
	target.appendChild(script);
	script = document.createElement("script");
	script.src = "tools/format/best_page_list.js";
	target.appendChild(script);
	
	var c = document.createElement("iframe");
	c.src = "widgets/news.html";
	target.appendChild(c);
	c.addEventListener("load", (function () {
		target.innerHTML = c.contentWindow.document.body.innerHTML;
		renderList("news_of_site", news_page_list, "quik_title", "quik_body", "quik_time", {}, {}, {});
		renderList("best_of_site", best_page_list, "quik_title", "quik_body", "quik_time", {}, {}, {});
	}), false);
})();
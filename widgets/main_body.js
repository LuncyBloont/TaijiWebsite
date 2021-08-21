(function main_body_draw() {
	var target = document.getElementById("main_body_js");
	target.style.width = "auto";
	target.style.height = "auto";
	target.className += " title_box";
	target.style.margin = "0.5cm";
	
	var iframe = document.createElement("iframe");
	iframe.src = ("widgets/main_body.html");
	target.appendChild(iframe);
	iframe.addEventListener("load", (function() {
		target.innerHTML = iframe.contentWindow.document.body.innerHTML;
		
		window.main_body_goto = function (src) {
			window.location.href = src;
		};
		
		(function () {
			var timemax1 = 100;
			var timemax2 = 200;
			var dt = 15;
			var ls = document.getElementsByClassName("main_body_button");
			for (var i = 0; i < ls.length; i++) {
				
				ls[i].onmouseenter = function() {
					var domi = this;
					var t = 0;
					var inid1 = setInterval(function ()
					{
						t += dt;
						domi.style.backgroundImage = "linear-gradient(90deg, rgba(255, 255, 255, 0.4) " +
							(t * 100 / timemax1) + "%, rgba(255, 255, 255, 0.1) " +
							(t * 100 / timemax1 + (timemax1 / 2 - Math.abs(t - timemax1 / 2)) / (timemax1 / 2) * 80) + "%)";
						if (t > timemax1) clearInterval(inid1);
					}, dt);
				};
				ls[i].onmouseleave = function() {
					var domi = this;
					var t = timemax2;
					var inid2 = setInterval(function ()
					{
						t -= dt;
						domi.style.backgroundImage = "linear-gradient(90deg, rgba(255, 255, 255, 0.4) " +
							(t * 100 / timemax2) + "%, rgba(255, 255, 255, 0.1) " +
							(t * 100 / timemax2 + (timemax2 / 2 - Math.abs(t - timemax2 / 2)) / (timemax2 / 2) * 80) + "%)";
						if (t <= 0) clearInterval(inid2);
					}, dt);
				};
			}
		})();
	}), false);
})();
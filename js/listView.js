function renderList(id, massage, titleClass = "", descriptionClass = "", timeClass = "", titleStyle = null, 
	descriptionStyle = null, timeStyle = null, titleType = "div", dedescriptionType = "div"
) {
	if (titleStyle == null) {
		titleStyle = {
			"background": "rgba(255, 255, 255, 0.9)",
			"margin": "0.3cm",
			"marginBottom": "0cm",
			"width": "auto",
			"borderRadius": "12px 12px 0 0",
			"padding": "3em 2em 2em 2em",
			"fontSize": "16pt",
			"fontWeight": "bold",
			"textAlign": "center",
			"marginTop": "36px"
		};
	}
	if (descriptionStyle == null) {
		descriptionStyle = {
			"margin": "0.3cm",
			"marginTop": "0cm",
			"marginBottom": "1cm",
			"width": "auto",
			"padding": "4em",
			"paddingTop": "0cm",
			"paddingBottom": "2cm",
			"border": "rgba(12, 12, 12, 0.1) solid 2px",
			"borderWidth": "0 0 0 0px",
			"textIndent": "2em",
			"overflow": "hidden",
			"background": "rgba(255, 255, 255, 0.9)",
			"borderRadius": "0 0 12px 12px"
		};
	}
	if (timeStyle == null) {
		timeStyle = {
			"fontWeight": "normal",
			"fontSize": "10pt",
			"whiteSpace": "nowrap",
			"display": "block",
			"margin": "2em",
			"marginBottom": "0em"
		};
	}
	
	var target = document.getElementById(id);
	for (var i = 0; i < massage.length; i += 2) {
		var t = document.createElement(titleType);
		t.className += " " + titleClass;
		t.innerHTML = massage[i].substring(0, massage[i].lastIndexOf("["));
		for (pair in titleStyle) {
			t.style[pair] = titleStyle[pair];
		}
		
		var tt = document.createElement("span");
		tt.className += " " + timeClass;
		tt.innerHTML = massage[i].substring(massage[i].lastIndexOf("|") + 1, massage[i].lastIndexOf("]"));
		for (pair in timeStyle) {
			tt.style[pair] = timeStyle[pair];
		}
		
		t.appendChild(tt);
		t.m_href = massage[i].substring(massage[i].lastIndexOf("[") + 1, massage[i].lastIndexOf("|"));
		t.onclick = function() {
			if (this.m_href && this.m_href != "") {
				window.location.href = this.m_href;
			}
		};
		
		var d = document.createElement(dedescriptionType);
		d.className += " " + descriptionClass;
		d.m_href = massage[i].substring(massage[i].lastIndexOf("[") + 1, massage[i].lastIndexOf("|"));
		
		var ds = massage[i + 1];
		
		ds = mformat(ds);
		
		d.innerHTML = ds;
		for (pair in descriptionStyle) {
			d.style[pair] = descriptionStyle[pair];
		}
		d.onclick = function() {
			if (this.m_href && this.m_href != "") {
				window.location.href = this.m_href;
			}
		};
		
		target.appendChild(t);
		target.appendChild(d);
	}
}

function makeTree(str, ps, i) {
	for (; i < str.length;)
	{
		if (str.substring(i, str.length).indexOf("$$[") == 0) {
			var sps = [str.substring(i, str.length).charAt(3)];
			ps.push(sps);
			i = makeTree(str, sps, i + 4);
		} else {
			var lm = str.substring(i, str.length).indexOf("$$[") + i;
			var rm = str.substring(i, str.length).indexOf("]$$") + i;
			lm = lm >= i ? lm : str.length;
			rm = rm >= i ? rm : str.length;
			
			if (lm <= rm) {
				ps.push(str.substring(i, lm));
				i = lm;
			} else {
				ps.push(str.substring(i, rm));
				return rm + 3;
			}
		}
	}
	return i;
}

function debug(ps, space) {
	for (var i = 0; i < ps.length; i++) {
		if (typeof(ps[i]) == "string") {
			console.log(space + ps[i]);
		} else {
			debug(ps[i], space + "--- ");
		}
	}
	console.log(space + ps[0]);
}

function emptyToNone(s) {
	if (s.length == 0) return "none";
	return s;
}

function treeToStr(ps) {
	var rs = "";
	for (var i = 1; i < ps.length; i++) {
		if (typeof(ps[i]) == "string") {
			rs += ps[i];
		} else {
			rs += treeToStr(ps[i]);
		}
	}
	var s = "";
	var col = "";
	var bg = "";
	switch (ps[0]) {
		case 'T':
		s = rs;
		break;
		
		case 'I':
		bg = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		s = "<img class=\"img_in_paragragh\" src=\"" + rs + "\" style=\"background: " + bg + "\" />";
		break;
		
		case 'H':
		col = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		bg = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		s = "<span class=\"h1_in_paragragh\" style=\"background: " + bg + "; color: " + col + "\">" + rs + "</span>";
		break;
		
		case 'S':
		col = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		bg = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		s = "<span class=\"h2_in_paragragh\" style=\"background: " + bg + "; color: " + col + "\">" + rs + "</span>";
		break;
		
		case 'C':
		col = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		bg = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		s = "<span style=\"background: " + bg + "; color: " + col + "\">" + rs + "</span>";
		break;
		
		case 'M':
		col = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		bg = emptyToNone(rs.substring(0, rs.indexOf("|")));
		rs = rs.substring(rs.indexOf("|") + 1, rs.length);
		s = "<div style=\"text-align:center; width: 100%; text-indent: 0em; background: " + bg + "; color: " + col + "\">" + rs + "</div>";
		break;
	}
	
	return s;
}

function mformat(str) {
	var parts = ["T"];
	makeTree(str, parts, 0);
	return treeToStr(parts);
}
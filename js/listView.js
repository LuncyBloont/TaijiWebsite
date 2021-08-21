function renderList(id, massage, titleClass = "", descriptionClass = "", timeClass = "", titleStyle = null, 
	descriptionStyle = null, timeStyle = null, titleType = "div", dedescriptionType = "div"
) {
	if (titleStyle == null) {
		titleStyle = {
			"background": "rgba(12, 12, 12, 0.1)",
			"margin": "0.3cm",
			"marginBottom": "0cm",
			"width": "auto",
			"borderRadius": "4px 4px 0 0",
			"padding": "4px",
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
			"padding": "4px",
			"paddingTop": "1cm",
			"paddingBottom": "2cm",
			"border": "rgba(12, 12, 12, 0.1) solid 2px",
			"borderWidth": "0 0 0 2px",
			"textIndent": "2em",
			"overflow": "hidden"
		};
	}
	if (timeStyle == null) {
		timeStyle = {
			"float": "right",
			"fontWeight": "normal",
			"fontSize": "10pt"
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

function mformat(str) {
	var parts = [];
	var scp = str;
	var rs = "";
	while (scp.length > 0) {
		if (scp.indexOf("$$[") >= 0) {
			parts.push(scp.substring(0, scp.indexOf("$$[")));
			parts.push(scp.substring(scp.indexOf("$$["), scp.indexOf("]$$") + 3));
			scp = scp.substring(scp.indexOf("]$$") + 3, scp.length);
		} else {
			parts.push(scp);
			scp = "";
		}
	}
	for (i in parts) {
		var s = parts[i];
		var type = 'T';
		if (s.indexOf("$$[") >= 0) {
			type = s.charAt(s.indexOf("$$[") + 3);
			s = s.substring(s.indexOf("$$[") + 4, s.indexOf("]$$"));
		}
		var sp;
		var styles;
		var schar = "|";
		switch (type) {
			case 'T':
			s = s.replace("\n", "<br />");
			break;
			
			case 'I':
			sp = s.split(schar);
			styles = "";
			styles += sp.length > 1 ? ("background: " + sp[1] + ";") : '';
			s = "<img class=\"img_in_paragragh\" src=\"" + sp[0] + "\" style=\"" + styles + "\" />";
			break;
			
			case 'H':
			sp = s.split(schar);
			styles = "";
			styles += sp.length > 1 ? ("background: " + sp[1] + ";") : '';
			styles += sp.length > 2 ? ("color: " + sp[2] + ";") : '';
			s = "<span class=\"h1_in_paragragh\" style=\"" + styles + "\">" + sp[0] + "</span>";
			break;
			
			case 'S':
			sp = s.split(schar);
			styles = "";
			styles += sp.length > 1 ? ("background: " + sp[1] + ";") : '';
			styles += sp.length > 2 ? ("color: " + sp[2] + ";") : '';
			s = "<span class=\"h2_in_paragragh\" style=\"" + styles + "\">" + sp[0] + "</span>";
			break;
			
			case 'C':
			sp = s.split(schar);
			styles = "";
			styles += sp.length > 1 ? ("background: " + sp[1] + ";") : '';
			styles += sp.length > 2 ? ("color: " + sp[2] + ";") : '';
			s = "<span style=\"" + styles + "\">" + sp[0] + "</span>";
			break;
		}
		
		rs += s;
	}
	return rs;
}
document.getElementById('contact-submit').onclick = function() {
	var re = /[a-zA-Z]+/;
	var name = document.getElementById("nameVal").value;
	var sectionHead = document.getElementById("section");
	var section = sectionHead.options[sectionHead.selectedIndex].value;
	var stateHead = document.getElementById("state");
	var state = stateHead.options[stateHead.selectedIndex].value;
	if (name.match(re)) {
		redirectTo(name, section, state);
	} else if (section != "Any Section") {
		redirectTo(name, section, state);
	} else if (state != "Any State") {
		redirectTo(name, section, state);
	} else {
		alert("Enter at least one field (other than minimum and maximum number of members)");
	}
}

function redirectTo(name, section, state) {
	var min = document.getElementById("min").value;
	var max = document.getElementById("max").value;
	if (max != "" && min != "" && parseInt(max) < parseInt(min)) {
		alert("Invalid combination of maximum and minimum");
	} else {
		if (min == "") min = "0";
		if (max == "") max = "1000";
		localStorage.setItem("ieeecs", "{\"name\":\""+name+"\",\"section\":\""+section+"\",\"state\":\""+state+"\",\"min\":\""+min+"\",\"max\":\""+max+"\"}");
		window.location.href = "search.html";
	}
}

function prompt() {
	var person = prompt("Please enter your name", "Harry Potter");
}
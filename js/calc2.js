


var main = function() {
	
	var totalStrings = 6;

	var strings = loadStringArray(totalStrings)

	var strings = document.getElementsByClassName("string");

	var string1 = parseFloat(document.getElementById("eString").value);
	var string2 = parseFloat(document.getElementById("bString").value);
	var string3 = parseFloat(document.getElementById("gString").value);
	var string4 = parseFloat(document.getElementById("dString").value);
	var string5 = parseFloat(document.getElementById("aString").value);
	var string6 = parseFloat(document.getElementById("lowEstring").value);

	console.log(string6);
	
	var centerToCenter = parseFloat(document.getElementById("centerToCenter").value);

};

var loadStringArray = function(totalStrings){
	var strings = [
		parseFloat(document.getElementById("eString").value),
		parseFloat(document.getElementById("bString").value)
	];
	var string1 = parseFloat(document.getElementById("eString").value);
	var string2 = parseFloat(document.getElementById("bString").value);
	var string3 = parseFloat(document.getElementById("gString").value);
	var string4 = parseFloat(document.getElementById("dString").value);
	var string5 = parseFloat(document.getElementById("aString").value);
	var string6 = parseFloat(document.getElementById("lowEstring").value);

	for (var pos = 0; pos < totalStrings; pos++){
		strings[pos] = str
	}
	return ;
}



if (!(val > 0))
		{
			rawStrings[i].classList.add("error");
			good = false;
		}
		else
		{
			rawStrings[i].classList.remove("error");
		}
		strings[i] = val;
	}
	if (!good){
		alert("Please fix your strings");
		return;
// This program calculates the string spacing for fretted musical instruments
// 12/29/2016
// Nils Johnson

var isValidInput;

var main = function() {
	var PRECISION = 3;
	isValidInput = true;

	var rawStrings = document.getElementsByClassName("string");
	//console.log(rawStrings[1]);
	var strings = [];
	var numStrings = rawStrings.length;
	console.log(numStrings)
	var totalStringWidth = 0;
	var centerToCenter = getPosNumber(document.getElementById("centerToCenter")); 

	for (var i = 0; i < numStrings; i++){
		strings[i] = getPosNumber(rawStrings[i]);
	}

	for (var i = 0; i < numStrings; i++){
		if(i === 0 || i === numStrings - 1)
		{
			totalStringWidth += strings[i]/2;	
		}
		else
		{
			totalStringWidth += strings[i]
		}
	}
	console.log(totalStringWidth);

	var spacing = (centerToCenter - totalStringWidth) / (numStrings - 1);

	var totalDistanceTreble = -strings[0]/2;
	var totalDistanceBass = -strings[0]/2 + strings[0]; 

	if (isValidInput)
	{
		for (var i = 1; i <= numStrings; i++){
			document.getElementById("string"+i).innerHTML = totalDistanceTreble.toFixed(PRECISION) + ", to " + totalDistanceBass.toFixed(PRECISION);
			totalDistanceTreble += spacing+strings[i-1];
			totalDistanceBass += spacing + strings[i];
		}
	}
	else
		console.log("input error!");
}; // main

var getPosNumber = function(element) {
	var val = getNumber(element); 
	if (val < 0)
	{
		showError(element);
		isValidInput = false;
		return;
	}	
	else if (val >= 0)
	{
		removeError(element);
		isValidInput = true;
		return val;
	} 
	else 
		return;
	
};

var getNumber = function (element){
	var val = parseFloat(element.value);
	if (isNaN(val))
	{
		showError(element);
		isValidInput = false;
		return;
	}
	else
	{ 
		removeError(element);
		isValidInput = true;
		return val;
	}
};

var showError = function (element) {
	element.classList.add("error");
};

var removeError = function (element) {
	element.classList.remove("error");

};
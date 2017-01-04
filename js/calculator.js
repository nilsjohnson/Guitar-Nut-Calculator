// This program calculates the string spacing for fretted musical instruments
// 12/29/2016
// Nils Johnson

var isValidInput;

var main = function() {
	var isOctaveInstrument = document.getElementById("octaveOrNot").checked;
	console.log("this is an octave instrument: " + isOctaveInstrument);
	var PRECISION = 3;
	isValidInput = true;
	var rawStrings = document.getElementsByClassName("string");
	var strings = [];
	var numStrings = rawStrings.length;
	var totalStringWidth = 0;
	var centerToCenter = getPosNumber(document.getElementById("centerToCenter")); 
	if (isOctaveInstrument)
	{
		var octaveSpace = getPosNumber(document.getElementById("octaveSpacing"));
	}	
	for (var i = 0; i < numStrings; i++)
	{
		strings[i] = getPosNumber(rawStrings[i]);
	}

	for (var i = 0; i < numStrings; i++)
	{
		if(i === 0 || i === numStrings - 1)
		{
			totalStringWidth += strings[i]/2;	
		}
		else
		{
			totalStringWidth += strings[i]
		}
	}

	if (isOctaveInstrument)
	{
		totalStringWidth += (octaveSpace*(numStrings/2));
	}

	var spacing = (centerToCenter - totalStringWidth) / (isOctaveInstrument ? numStrings / 2 - 1 : numStrings -1);
	var totalDistanceTreble = -strings[0]/2;
	var totalDistanceBass = -strings[0]/2 + strings[0]; 

	if (isValidInput && !isOctaveInstrument)
	{
		for (var i = 1; i <= numStrings; i++)
		{
			document.getElementById("trebleSide"+i).innerHTML = totalDistanceTreble.toFixed(PRECISION);
			document.getElementById("bassSide"+i).innerHTML = totalDistanceBass.toFixed(PRECISION);
			totalDistanceTreble += spacing+strings[i-1];
			totalDistanceBass += spacing + strings[i];
		}

	}
	else if (isValidInput && isOctaveInstrument)
	{
		for (var i = 1; i <= numStrings; i++)
		{
			if (i % 2 === 1)
			{
				document.getElementById("trebleSide"+i).innerHTML = totalDistanceTreble.toFixed(PRECISION);
				document.getElementById("bassSide"+i).innerHTML = totalDistanceBass.toFixed(PRECISION);
				totalDistanceTreble += octaveSpace+strings[i-1];
				totalDistanceBass += octaveSpace + strings[i];

			}
			else
			{
				document.getElementById("trebleSide"+i).innerHTML = totalDistanceTreble.toFixed(PRECISION);
				document.getElementById("bassSide"+i).innerHTML = totalDistanceBass.toFixed(PRECISION);
				totalDistanceTreble += spacing+strings[i-1];
				totalDistanceBass += spacing + strings[i];
			}
		}

	}
	else
	{
		console.log("input error!");
	}
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

function popuponclick() {
     my_window = window.open('', 'mywindow', 'status=1,width=600,height=800');
     my_window.document.write('<html><head><title>Print Me</title></head>');
   	 my_window.document.write('<body onafterprint="self.close()">');
     my_window.document.write('<p>' + document.getElementById('resultTable').innerHTML + '</p>');
     my_window.document.write('</body></html>');  
  }
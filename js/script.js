var precision = 3;
var currentSets = null;
var chosenSet = null;
var isOctave = null;


var setInstrument = function(value)
{
	var widthElement = document.getElementById("width");

	switch(value)
	{
		case "guitar":
			widthElement.value = "1.45";
			fillStringSetList(guitarSets);
			isOctave = false;
			break;

		case "bass":
			widthElement.value = "1.00";
			fillStringSetList(bassSets);
			isOctave = false;
			break;

		case "mandolin":
			widthElement.value = "1.00";
			fillStringSetList(mandoSets);
			isOctave = true
			break;

		case "12-string":
			widthElement.value = "1.75";
			fillStringSetList(twelveStringSets);
			isOctave = true
			break;


		default:
			console.log("option not found? : (");
			break;		
		}

		(isOctave ? setForOctaveInput(): setForRegularInput());
		prefillGuageInputs(0);
}

// fills the dropdown menu with possible sets
var fillStringSetList = function(stringSets)
{
	// set the current sets to be fore the selected instrument
	currentSets = stringSets;

	// clear the options
	clearChildren("guage-select");


	for(var i = 0; i < currentSets.length; i++)
	{
		var setName = currentSets[i].setName;

		var option = document.createElement("option");
		option.value = i;

		option.innerHTML = setName;
  		document.getElementById('guage-select').appendChild(option);
	}
}

// puts the string guages from the chosen set as inputs
var prefillGuageInputs = function(setIndex)
{
	chosenSet = currentSets[setIndex]	
	var numStrings = chosenSet.strings.length;

	// clear the inputs
	clearChildren("guage-input");

	// fill the guage input section
	for(var i = 0; i < numStrings; i++)
	{
		var div = document.createElement("div");

		var label = document.createElement("label");
		label.innerHTML = chosenSet.strings[i].stringName + ": ";

		var input = document.createElement("input");
		input.classList.add("string-input");
		input.value = chosenSet.strings[i].guage;
		input.addEventListener("keyup", calculate);

		div.appendChild(label);
		div.appendChild(input);

		if(isOctave)
		{
			i++;

			var label_2 = document.createElement("label");
			label_2.innerHTML = chosenSet.strings[i].stringName + ": ";

			var input_2 = document.createElement("input");
			input_2.classList.add("string-input");
			input_2.value = chosenSet.strings[i].guage;
			input_2.addEventListener("keyup", calculate);
			div.appendChild(label_2);
			div.appendChild(input_2);
		}

		document.getElementById("guage-input").appendChild(div);
	}

	calculate();
}


// gets input and calculates spacing
var calculate = function()
{
	var stringGuageElements = document.getElementsByClassName("string-input");
	var stringGuages = [];

	var widthElement = document.getElementById("width");
	var width;

	var unionSpaceElem = document.getElementById("union-space");
	var unionSpace;

	// for calculations
	var totalStringWidth = 0;
	var spacing;
	var numStrings = stringGuageElements.length;
	var trebleSide;
	var bassSide;
	
	// to flag if exception was thrown
	var illegalStringInput = false;
	var illegalWidth = false;
	var illegalUnionSpace = false;

	// remove any previous errors
	widthElement.classList.remove("error");
	unionSpaceElem.classList.remove("error");

	// add up all string guages
	for(var i = 0; i < numStrings; i++)
	{
		stringGuageElements[i].classList.remove("error");
		try
		{
			var temp = parseFloat(stringGuageElements[i].value)
			
			// if OK
			if(!isNaN(temp) && temp > 0)
			{
				totalStringWidth += temp;
				stringGuages[i] = temp;
			}
			else
			{
				throw("String Input Error");
			}
		}
		catch(exception)
		{
			console.log(exception);
			stringGuageElements[i].classList.add("error");
			illegalStringInput = true;
		}
	}

	// get union space if necessary
	if(isOctave)
	{
		try
		{	
			var temp = parseFloat(unionSpaceElem.value)
			// if OK
			if(!isNaN(temp) && temp > 0)
			{
				unionSpace = temp;
				totalStringWidth += unionSpace*(numStrings/2);
			}
			else
			{
				throw("Union Spacing Error")
			}
		}
		catch(exception)
		{
			console.log(exception);
			unionSpaceElem.classList.add("error");
			illegalUnionSpace = true;
		}
	}

	// get nut width
	try
	{
		var temp = parseFloat(widthElement.value);

		// if OK
		if(!isNaN(temp) && temp > totalStringWidth)
		{
			width = temp;
		}
		else
		{
			throw("Invalid Width: Not a number or more greater than sum of all strings.");
		}
	}
	catch(exception)
	{
		console.log(exception);
		widthElement.classList.add("error");
		illegalWidth = true;
	}


	// clear old data
	clearChildren("output-table-body");
	clearChildren("output-table-head");

	if(illegalStringInput || illegalWidth || illegalUnionSpace)
	{
		return;
	}

	// set bass/treble side starting points
	if(isCenterToCenter())
	{
		trebleSide = -(stringGuages[0]/2);
		bassSide = stringGuages[0]/2;

		totalStringWidth -= stringGuages[0]/2 + stringGuages[numStrings-1]/2;
	}
	else if (isEdgeToEdge())
	{
		trebleSide = 0;
		bassSide = stringGuages[0];
	}

	// for the table Head
	var trHead = document.createElement("tr");
	var stringCol = document.createElement("th");
	var trebleCol = document.createElement("th");
	var bassCol= document.createElement("th");
	var stringCol2 = document.createElement("th");
	var trebleCol2 = document.createElement("th");
	var bassCol2 = document.createElement("th");

	stringCol.innerHTML = "";
	trebleCol.innerHTML = "Treble Side";
	bassCol.innerHTML = "Bass Side";

	trHead.appendChild(stringCol);
	trHead.appendChild(trebleCol);
	trHead.appendChild(bassCol);
		
	if(!isOctave)
	{
		spacing = (width-totalStringWidth)/(numStrings-1);
		for (var i = 0; i < numStrings; i++)
		{
			var tr = document.createElement("tr");
			var nameTd = document.createElement("td")
			var trebleTd = document.createElement("td");
			var bassTd = document.createElement("td");
			nameTd.innerHTML = chosenSet.strings[i].stringName + " (" + (i+1) + ")";
			trebleTd.innerHTML = trebleSide.toFixed(precision);
			bassTd.innerHTML = bassSide.toFixed(precision);

			tr.appendChild(nameTd);
			tr.appendChild(trebleTd);
			tr.appendChild(bassTd);

			document.getElementById("output-table-body").appendChild(tr);

			trebleSide += stringGuages[i] + spacing;
			bassSide += spacing + stringGuages[i+1];
		}
	}
	// if is an octave instrument
	else
	{	
		// add table
		stringCol2.innerHTML = "";
		trebleCol2.innerHTML = "Treble Side";
		bassCol2.innerHTML = "Bass Side";
		trHead.appendChild(stringCol2);
		trHead.appendChild(trebleCol2);
		trHead.appendChild(bassCol2);

		spacing = (width-totalStringWidth)/(numStrings/2-1)
		var i = 0;
		
		// each loop does a unison
		while(i < numStrings)
		{
			// the row
			var tr = document.createElement("tr");

			// the first
			var nameTd_1 = document.createElement("td")
			var trebleTd_1 = document.createElement("td");
			var bassTd_1 = document.createElement("td")

			nameTd_1.innerHTML = chosenSet.strings[i].stringName + " (" + (i+1) + ")";
			trebleTd_1.innerHTML = trebleSide.toFixed(precision);
			bassTd_1.innerHTML = bassSide.toFixed(precision);

			tr.appendChild(nameTd_1);
			tr.appendChild(trebleTd_1);
			tr.appendChild(bassTd_1);

			if(i%2 == 0)
			{
				trebleSide += stringGuages[i] + unionSpace;
				bassSide += stringGuages[i+1] + unionSpace;
			}
			else
			{
				trebleSide += stringGuages[i] + spacing;
				bassSide += stringGuages[i+1] + spacing;
			}

			i++;
				
			// the second string
			var nameTd_2 = document.createElement("td")
			var trebleTd_2 = document.createElement("td");
			var bassTd_2 = document.createElement("td")

			nameTd_2.innerHTML = chosenSet.strings[i].stringName + " (" + (i+1) + ")";
			trebleTd_2.innerHTML = trebleSide.toFixed(precision);
			bassTd_2.innerHTML = bassSide.toFixed(precision);
			tr.appendChild(nameTd_2);
			tr.appendChild(trebleTd_2);
			tr.appendChild(bassTd_2);

			document.getElementById("output-table-body").appendChild(tr);

			if(i%2 == 0)
			{
				trebleSide += stringGuages[i] + unionSpace;
				bassSide += stringGuages[i+1] + unionSpace;
			}
			else
			{
				trebleSide += stringGuages[i] + spacing;
				bassSide += stringGuages[i+1] + spacing;
			}
				
			i++;
		}
	}

	document.getElementById("output-table-head").appendChild(trHead);
}


var isCenterToCenter = function()
{
	if(document.getElementById("center-to-center-radio").checked == true)
	{
		return true;
	}
}

var isEdgeToEdge = function()
{
	if(document.getElementById("edge-to-edge-radio").checked == true)
	{
		return true;
	}
}


var clearChildren = function(parentId)
{
	document.getElementById(parentId).innerHTML = "";
}

var setForOctaveInput = function()
{
	document.getElementById("union-space-wrapper").style.display = "inline";
}

var setForRegularInput = function()
{
	document.getElementById("union-space-wrapper").style.display = "none";
}

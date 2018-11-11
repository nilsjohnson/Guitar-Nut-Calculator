var precision = 3;
var currentSets = null;
var chosenSet = null;
var octaveInputShowing = false;
var lastOctaveSpacing = 1;

document.getElementById("octave").addEventListener('change', function() {
    if(this.checked) 
    {
    	showOctaveSpacingInput();
    }
    else
    {
    	removeOctaveSpacingInput();
    }
});


var isOctave = function()
{
	if(document.getElementById("octave").checked)
	{
		return true;
	}
	else
	{
		return false;
	}
}


var setInstrument = function(value)
{
	document.getElementById("num-strings").readOnly = true;
	document.getElementById("num-strings").classList.remove("focused");
	document.getElementById("octave").checked = false;
	document.getElementById("octave").disabled = true; 
	removeOctaveSpacingInput();

	switch(value)
	{
		case "guitar":
			fillStringSetList(guitarSets);
			break;

		case "bass":
			fillStringSetList(bassSets);
			break;

		case "custom":
			document.getElementById("octave").disabled = false; 
			document.getElementById("num-strings").readOnly = false;
			document.getElementById("num-strings").classList.add("focused");
			document.getElementById("num-strings").addEventListener("change", makeCustomSet);

			fillStringSetList(custSets);

			break;
	

		case "mandolin":
			showOctaveSpacingInput();
			fillStringSetList(mandoSets);
			document.getElementById("octave").checked = true;
	
			break;	

		default:
			console.log("option not found? : (");
			break;
	}
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

// puts the string guages from the chosen set on page
var prefillGuageInputs = function(setIndex)
{
	chosenSet = currentSets[setIndex]	
	var numStrings = chosenSet.strings.length;

	// clear the inputs
	clearChildren("guage-input");

	// set the number of strings field
	document.getElementById("num-strings").value = numStrings;

	// fill the guage input section
	if(!isOctave())
	{
		for(var i = 0; i < numStrings; i++)
		{

			var div = document.createElement("div");

			var label = document.createElement("label");
			label.innerHTML = chosenSet.strings[i].stringName + ": ";

			var input = document.createElement("input");
			input.classList.add("string-input");
			input.value = chosenSet.strings[i].guage;
			input.addEventListener("change", calculate);

			div.appendChild(label);
			div.appendChild(input);
			document.getElementById("guage-input").appendChild(div);
		}
	}
	else
	{
		var i = 0;
		while(i < numStrings)
		{
			var div = document.createElement("div");

			var label = document.createElement("label");
			label.innerHTML = chosenSet.strings[i].stringName + ": ";

			var input = document.createElement("input");
			input.classList.add("string-input");
			input.value = chosenSet.strings[i].guage;
			input.addEventListener("change", calculate);
			input.classList.add("inline");

			i++;

			var label2 = document.createElement("label");
			label2.innerHTML = chosenSet.strings[i].stringName + ": ";

			var input2 = document.createElement("input");
			input2.classList.add("string-input");
			input2.value = chosenSet.strings[i].guage;
			input2.addEventListener("change", calculate);
			input2.classList.add("inline");

			i++;

			div.appendChild(label);
			div.appendChild(input);
			div.appendChild(label2);
			div.appendChild(input2);
			document.getElementById("guage-input").appendChild(div); 
		}
	}

	calculate();
}


// gets input and calculates spacing
var calculate = function()
{
	var stringGuageElements = document.getElementsByClassName("string-input");
	var stringGuages = [];
	var centerToCenterElement = document.getElementById("width");
	var totalStringWidth = 0;
	var spacing = null;
	var numStrings = stringGuageElements.length;

	// to flag if exception was thrown
	var illegalStringInput = false;
	var illegalCenterToCenter = false;

	// add up all string guages
	for(var i = 0; i < numStrings; i++)
	{
		stringGuageElements[i].classList.remove("error");
		try
		{
			var temp = parseFloat(stringGuageElements[i].value)
			
			if(!isNaN(temp) && temp > 0)
			{
				totalStringWidth += temp;
				stringGuages[i] = temp;
			}
			else if(isNaN(temp))
			{
				throw("Invalid Input - NaN")
			}
			else if(temp < 0)
			{
				throw("input was less than zero")
			}
			else
			{
				throw("input error");
			}
		}
		catch(exception)
		{
			console.log(exception);
			stringGuageElements[i].classList.add("error");
			illegalStringInput = true;
		}
	}


	// dont continue if bad input
	if(illegalStringInput)
	{
		return;
	}

	// since we measure illegalCenterToCenter to center, ignore space beyond in total
	totalStringWidth -= stringGuages[0]/2 + stringGuages[numStrings-1]/2;

	try
	{
		// clear old data
		clearChildren("output-table-body");
		clearChildren("output-table-head");

		var centerToCenter = parseFloat(centerToCenterElement.value);
		console.log(centerToCenter);

		if(isNaN(centerToCenter) || centerToCenter < totalStringWidth)
		{
			throw("invalid center to center");
		}
		centerToCenterElement.classList.remove("error");

		if(isOctave())
		{
			lastOctaveSpacing = parseFloat(document.getElementById("octave-spacing").value);
			totalStringWidth += lastOctaveSpacing * (numStrings/2);
		}

		if(!isOctave())
		{
			spacing = (centerToCenter-totalStringWidth)/(numStrings-1);
		}
		else
		{
			spacing = (centerToCenter-totalStringWidth)/((numStrings/2)-1);
		}
	

		var trebleSide = -(stringGuages[0]/2);
		var bassSide = stringGuages[0]/2;

		// for the table Head
		var trHead = document.createElement("tr");
		var stringCol = document.createElement("th");
		var trebleCol = document.createElement("th");
		var bassCol = document.createElement("th");

		stringCol.innerHTML = "String";
		trebleCol.innerHTML = "Treble";
		bassCol.innerHTML = "Bass";

		trHead.appendChild(stringCol);
		trHead.appendChild(trebleCol);
		trHead.appendChild(bassCol);
		

		if(!isOctave())
		{
			for (var i = 0; i < numStrings; i++)
			{
				var tr = document.createElement("tr");
				var nameTd = document.createElement("td")
				var trebleTd = document.createElement("td");
				var bassTd = document.createElement("td")

				nameTd.innerHTML = chosenSet.strings[i].stringName;;
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
			// add columns to table for octave strings
			var stringCol2 = document.createElement("th");
			var trebleCol2 = document.createElement("th");
			var bassCol2 = document.createElement("th");

			stringCol2.innerHTML = "String"
			trebleCol2.innerHTML = "Treble"
			bassCol2.innerHTML = "Bass";

			trHead.appendChild(stringCol2);
			trHead.appendChild(trebleCol2);
			trHead.appendChild(bassCol2);

			var i = 0;
			while(i < numStrings)
			{
				console.log("spacing: " + spacing)
				console.log("lastOctaveSpacing: " + lastOctaveSpacing)

				var tr = document.createElement("tr");
				var nameTd = document.createElement("td")
				var trebleTd = document.createElement("td");
				var bassTd = document.createElement("td")
				var name2Td = document.createElement("td");
				var treble2Td = document.createElement("td");
				var bass2Td = document.createElement("td")

				// puts string in table
				nameTd.innerHTML = chosenSet.strings[i].stringName;
				trebleTd.innerHTML = trebleSide.toFixed(precision);
				bassTd.innerHTML = bassSide.toFixed(precision);
				tr.appendChild(nameTd);
				tr.appendChild(trebleTd);
				tr.appendChild(bassTd);

				// sets the location for next string
				trebleSide += stringGuages[i] + lastOctaveSpacing;
				i++;
				bassSide += lastOctaveSpacing + stringGuages[i];
				
				// puts mext stromg in the table
				name2Td.innerHTML = chosenSet.strings[i].stringName;
				treble2Td.innerHTML = trebleSide.toFixed(precision);
				bass2Td.innerHTML = bassSide.toFixed(precision);
				tr.appendChild(name2Td);
				tr.appendChild(treble2Td);
				tr.appendChild(bass2Td);

				// sets location for next string
				trebleSide += stringGuages[i] + spacing;
				i++;
				bassSide += spacing + stringGuages[i];

				

				// add table row
				document.getElementById("output-table-body").appendChild(tr);
			}
		}

		document.getElementById("output-table-head").appendChild(trHead);
	}
	catch(exception)
	{
		console.log(exception);
		centerToCenterElement.classList.add("error");
	}

}

var makeCustomSet = function()
{
	var numStrings = document.getElementById("num-strings").value;
	console.log("num Strings: " + numStrings);
	var customStrings = [];

	for(var i = 0; i < numStrings; i++)
	{
		customStrings.push(new InstrumentString(null, "String " + (i+1)));
	}

	var set = [new InstrumentStringSet(customStrings, "Custom Set")];
	fillStringSetList(set);
	prefillGuageInputs(0);
}

var showOctaveSpacingInput = function()
{
	if(!octaveInputShowing)
	{
		var div = document.createElement("div");
		div.id = "octave-input";

		var input = document.createElement("input");
		input.id = "octave-spacing";
		input.value = lastOctaveSpacing;
		input.addEventListener("change", calculate);

		
		var label = document.createElement("label");
		label.innerHTML = "Space Between Octave Strings";

		div.appendChild(label);
		div.appendChild(input);

		document.getElementById("options").appendChild(div);
		octaveInputShowing = true;

		prefillGuageInputs(0);
	}
}

var removeOctaveSpacingInput = function()
{
	if(octaveInputShowing)
	{
		var div = document.getElementById("octave-input");
		div.parentNode.removeChild(div);
		octaveInputShowing = false;

		prefillGuageInputs(0);
	}
}

var clearChildren = function(parentId)
{
	document.getElementById(parentId).innerHTML = "";
}

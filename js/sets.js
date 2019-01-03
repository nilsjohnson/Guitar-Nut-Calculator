//----Class Defs----
class InstrumentString {
	constructor(guage, stringName) {
		this.guage = guage;
		this.stringName = stringName;
	}
}

class InstrumentStringSet {
	constructor(strings, setName)
	{
		this.strings = strings;
		this.setName = setName;
	}
}

//----String guages----
var acousticLightStrings = [
new InstrumentString(.012, "e"),
new InstrumentString(.016, "b"),
new InstrumentString(.024, "g"),
new InstrumentString(.032, "d"),
new InstrumentString(.042, "a"),
new InstrumentString(.053, "E")
];

var acousticMedStrings = [
new InstrumentString(.013, "e"),
new InstrumentString(.017, "b"),
new InstrumentString(.026, "g"),
new InstrumentString(.035, "d"),
new InstrumentString(.045, "a"),
new InstrumentString(.056, "E") 
];

var electricExtraLightStrings = [
new InstrumentString(.009, "e"),
new InstrumentString(.011, "b"),
new InstrumentString(.016, "g"),
new InstrumentString(.024, "d"),
new InstrumentString(.032, "a"),
new InstrumentString(.042, "E") 
];

var electricLightStrings = [
new InstrumentString(.010, "e"),
new InstrumentString(.013, "b"),
new InstrumentString(.017, "g"),
new InstrumentString(.026, "d"),
new InstrumentString(.036, "a"),
new InstrumentString(.046, "E") 
];

var electricMedStrings = [
new InstrumentString(.011, "e"),
new InstrumentString(.014, "b"),
new InstrumentString(.018, "g"),
new InstrumentString(.028, "d"),
new InstrumentString(.038, "a"),
new InstrumentString(.048, "E") 
];

var bassLightStrings = [
new InstrumentString(.045, "G"),
new InstrumentString(.065, "D"),
new InstrumentString(.080, "A"),
new InstrumentString(.100, "E")
];

var bassMedStrings = [
new InstrumentString(.050, "G"),
new InstrumentString(.070, "D"),
new InstrumentString(.085, "A"),
new InstrumentString(.105, "E")
];

var mandoLightStrings = [
new InstrumentString(.010, "e"),
new InstrumentString(.010, "e"),
new InstrumentString(.014, "a"),
new InstrumentString(.014, "a"),
new InstrumentString(.024, "d"),
new InstrumentString(.024, "d"),
new InstrumentString(.038, "g"),
new InstrumentString(.038, "g")
];

var mandoMedLightStrings = [
new InstrumentString(.011, "e"),
new InstrumentString(.011, "e"),
new InstrumentString(.015, "a"),
new InstrumentString(.015, "a"),
new InstrumentString(.024, "d"),
new InstrumentString(.024, "d"),
new InstrumentString(.038, "g"),
new InstrumentString(.038, "g")
];

var mandoMedStrings = [
new InstrumentString(.011, "e"),
new InstrumentString(.011, "e"),
new InstrumentString(.015, "a"),
new InstrumentString(.015, "a"),
new InstrumentString(.026, "d"),
new InstrumentString(.026, "d"),
new InstrumentString(.040, "g"),
new InstrumentString(.040, "g")
];

var mandoHeavyMedStrings = [
new InstrumentString(.0115, "e"),
new InstrumentString(.0115, "e"),
new InstrumentString(.016, "a"),
new InstrumentString(.016, "a"),
new InstrumentString(.026, "d"),
new InstrumentString(.026, "d"),
new InstrumentString(.041, "g"),
new InstrumentString(.041, "g")

];

var twelveStringAcousticLightStrings = [
new InstrumentString(.010, "e"),
new InstrumentString(.010, "e"),
new InstrumentString(.014, "b"),
new InstrumentString(.014, "b"),
new InstrumentString(.023, "g"),
new InstrumentString(.008, "g"),
new InstrumentString(.030, "d"),
new InstrumentString(.012, "d"),
new InstrumentString(.039, "a"),
new InstrumentString(.018, "a"),
new InstrumentString(.047, "E"),
new InstrumentString(.027, "E")

];

var tweleveStringElecLightStrings = [
new InstrumentString(.010, "e"),
new InstrumentString(.010, "e"),
new InstrumentString(.013, "b"),
new InstrumentString(.013, "b"),
new InstrumentString(.017, "g"),
new InstrumentString(.008, "g"),
new InstrumentString(.026, "d"),
new InstrumentString(.012, "d"),
new InstrumentString(.036, "a"),
new InstrumentString(.018, "a"),
new InstrumentString(.046, "E"),
new InstrumentString(.026, "E")

];

//----12 String Sets----
var twelveStringAcousticLight = new InstrumentStringSet(twelveStringAcousticLightStrings, "Acoustic - Light");
var tweleveStringElectricLight = new InstrumentStringSet(tweleveStringElecLightStrings, "Electric - Light");

//----Guitar Sets----
var acousticLight = new InstrumentStringSet(acousticLightStrings, "Acoustic - Light");
var acousticMed = new InstrumentStringSet(acousticMedStrings, "Acoustic - Medium");
var electricMed = new InstrumentStringSet(electricMedStrings, "Electric - Medium");
var electricLight = new InstrumentStringSet(electricLightStrings, "Electric - Light");
var electricExtraLight = new InstrumentStringSet(electricExtraLightStrings, "Electric - Medium");

//----Bass Sets----
var bassLight = new InstrumentStringSet(bassLightStrings, "Light");
var bassMed = new InstrumentStringSet(bassMedStrings, "Medium");

//----Mando Sets----
var mandoLight = new InstrumentStringSet(mandoLightStrings, "Light");
var mandoMedLight = new InstrumentStringSet(mandoMedLightStrings, "Medium-Light");
var mandoMed = new InstrumentStringSet(mandoMedStrings, "Medium");
var mandoHeavyMed = new InstrumentStringSet(mandoHeavyMedStrings, "Heavy-Medium");

// -- dummy custom set
var customSet = new InstrumentStringSet([], "")

//---Arrays of sets----

var twelveStringSets = [
twelveStringAcousticLight,
tweleveStringElectricLight

];

var guitarSets = [
acousticLight, 
acousticMed, 
electricExtraLight, 
electricLight, 
electricMed];

var bassSets = [
bassLight, 
bassMed
];

var mandoSets = [
mandoLight,
mandoMedLight,
mandoMed,
mandoHeavyMed
];

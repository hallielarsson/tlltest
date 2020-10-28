const fetch = require('node-fetch');
const assert = require('assert');
let exerciseUrl = "https://translifeline.org/hiring_stats_sample";


async function main() {
	let data = await getHiringData(exerciseUrl);
	displayHiringData(data);
	return data;
}

function displayHiringData(data) {
	assert('answered' in data, "The data does not have a field called 'answered'.")
	console.log(formatNumber(data.answered));
}

async function getHiringData(url) {
	let response = await fetch(url);
	let data = response.json();
	return data;
}

function formatNumber(number, segmentLength=3) {
	let numberString = number.toString();
	let out = "";

	while(numberString.length > 0) {
		if(numberString.length > segmentLength) {
			out = `,${numberString.slice(-segmentLength)}${out}`; //add the last {segmentLength} characters to the front of the output string
			numberString = numberString.slice(0, numberString.length - segmentLength); //chop the last three characters off of the numberString
		} else {
			out = `${numberString}${out}`;
			numberString = "";
		}
	}
	return out;
}

main().then(
	null,// if you need to do something AFTER main finishes, put that callback function here instead of null. the retrieved data will be passed as the parameter
	(error) => { 
		console.log("Error Occurred", error);
	}
);


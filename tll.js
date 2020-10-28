const fetch = require('node-fetch');
const assert = require('assert');
let exerciseUrl = "https://translifeline.org/hiring_stats_sample";


async function main() {
	let data = await getHiringData(exerciseUrl);
	displayHiringData(data);
}

function displayHiringData(data) {
	assert('answered' in data, "The data does not have a field called 'answer'.")
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
			out = `,${numberString.slice(-segmentLength)}${out}`;
			numberString = numberString.slice(0, numberString.length - segmentLength);
		} else {
			out = `${numberString}${out}`;
			numberString = "";
		}
	}
	return out;
}

main().then(null,(error) => {
	console.log("Error Occurred", error);
});


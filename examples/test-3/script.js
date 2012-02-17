//test whether stack traces are still descriptive

catchall.error = function(e) {
	console.error("ERR!");
	console.error(e.stack);
}


var _testName

function setName(value) {
	_testName = value.length > 3 ? value : _testName;
}


function entry(name) {
	setName(name);
}


function entry2() {
	entry(undefined);
}


entry2();
var catchall = require('../../');

console.log("WRAP")

catchall.write(__dirname + "/script.js", __dirname + "/script.wrap.js", function(err, result) {
	if(err) console.log(err.stack)
});
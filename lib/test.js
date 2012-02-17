var fs  = require('fs'),
burrito = require('burrito'),
outcome = require('outcome');


/**
 * generates & writes 
 */

exports.write = function(input, output, callback) {

	var on = outcome.error(callback);

	console.log(input)
	
	fs.readFile(input, "utf8", on.success(function(content) {

		exports.generate(content, on.success(function(result) {
			
			console.log(result);
				
		}));

	}));
}


function name() {
	
}

/**
 * generates from content 
 */

exports.generate = function(content, callback) {

	var res = burrito(content, function(js) {
		
		console.log(js.name)
		if(js.name == 'block') {
		}
	});


	callback(null, res);

}


exports.write(__filename);
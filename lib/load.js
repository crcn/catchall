var wrap = require('./wrap'),
fs = require('fs'),
request = require('request'),
outcome = require('outcome');


//TODO - cache

module.exports = function(source, callback) {
	
	var on = outcome.error(callback);


	//url?
	if(source.indexOf('http://') == 0) {
		request(source, on.success(function(response, content) {
			onLoad(content);
		}));

	//fs?
	} else {
		fs.readFile(source, on.success(onLoad));
	}


	function onLoad(content) {
		wrap(content, callback);		
	}

}
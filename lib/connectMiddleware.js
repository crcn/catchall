var Url = require('url'),
load    = require('./load'),
outcome = require('outcome');


//http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js

module.exports = function(req, res, next) {

	var hrefParts = req.url.split('/').slice(1);

	//remove root /
	if(hrefParts.shift() != 'catchall') return next();

	//catchall/http://somescript.js
	var target = hrefParts.join('/').toString();

	//not a url? it's local.
	if(target.indexOf('http://') != 0) target = 'http://' + req.headers.host + '/' + target;

	var on = outcome.error(next);

	load(target, on.success(function(result) {
		
		res.end(result);
			
	}));
}
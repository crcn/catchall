var fs  = require('fs'), 
wrap    = require('./wrap'),
cache   = require('./cache'),
request = require('request'),
outcome = require('outcome');


//TODO - cache

module.exports = function(source, ops, callback) {
	
	if(typeof ops == 'function') {
		callback = ops;
		ops = {};
	}

	ops.uglify       = !!ops.uglify; // boolean cast
	ops.indent_level = ops.indent_level || 1; 

	var on = outcome.error(callback), 
	loadingCache = false,
	cacheKey = source + ops.uglify + ops.indent_level;



	//url?
	if(source.indexOf('http://') == 0) {
		request(source, on.success(function(response, content) {

			if(loadingCache) return;

			onLoad(new Date(response.headers['last-modified']), content);

		//on response, check for cache
		})).on('response', function(response) {	

			//pluck the last-modified date from the header
			var lastModified = new Date(response.headers['last-modified']),
			self = this;


			//used modified date to check if the response is NEWER than the cached version
			cache.get(cacheKey, lastModified, function(hasCache, file) {
				if(!file) return;

				//still cached.
				onCacheFile(file);
			})
		})

	//fs?
	} else {

		//need the modified time so we can get cached content
		fs.stat(source, on.success(function(stat) {

			//get the cache
			cache.get(cacheKey, stat.mtime, function(hasCache, file) {

				if(file) return onCacheFile(file);

				fs.readFile(source, on.success(function(content) {

					onLoad(stat.mtime, content);

				}));	
			});
		}));
	}



	// returns the cacched file if it has not been modified
	function onCacheFile(file) {

		//flagged so http request isn't passed
		loadingCache = true;

		fs.readFile(file, "utf8", callback);

	}



	function onLoad(lastModified, content) {

		//guard the JS code with catchall
		wrap(content, ops, on.success(function(wrappedContent) {

			//cache the wrapped content so the JS isn't processed again
			cache.set(cacheKey, lastModified, wrappedContent);

			//return the wrapped content
			callback(null, wrappedContent);
		}));		
	}



}
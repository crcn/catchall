var catchallDir = '/usr/local/etc/catchall',
cacheDir        = catchallDir + "/cache";

var cfg         = require('yaconfig').file(catchallDir + "/cached.json"),
fs              = require('fs'),
crypto          = require('crypto'),
path            = require('path');


//yaconfig makes our directories - this is fine.
try {

	fs.mkdirSync(cacheDir, 0777);

} catch(e) {
	
}



function _cacheKey(source) {

	return crypto.createHash('md5').update(source).digest("hex");

}

function _cachePath(key) {

	return cacheDir + "/" + key + ".cache";

}

function exists(path) {

	try {

		fs.lstatSync(path);

		return true;

	} catch(e) {

		return false;
	}

}


exports.get = function(source, lastModified, callback) {

	var key = _cacheKey(source);

	//no cache?
	if(!cfg.get(key)) return callback(true);

	//old cache?
	if(cfg.get(key) < lastModified.getTime()) return callback(true);

	var cachePath = _cachePath(key);

	//exists? necessary to beat race condition with http requests
	if(!exists(cachePath)) return callback(true);

	callback(null, cachePath);

}

exports.set = function(source, lastModified, content, callback) {
	
	var key = _cacheKey(source);
	cfg.set(key, lastModified.getTime());
	fs.writeFile(_cachePath(key), content);

}
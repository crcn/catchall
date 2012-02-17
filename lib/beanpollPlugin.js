var load = require('./load');

exports.plugin = function(router) {
	
	router.on({

		/**
		 */

		'pull catchall/load': function(req, res) {

			load(req.query.source, res.success(function(result) {

				res.end(result);

			}));

		}
	});
	
}
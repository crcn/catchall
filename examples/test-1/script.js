//anonymous functions?

catchall.onerror = function(e) {
	console.log("Error!!!");
	console.error(e.stack);
};     

function ttt() {
	console.log("HELLO")
	console.log("HELLO")
	console.log("HELLO")
	console.log("HELLO")
	console.log("HELLO")
	console.log("HELLO")
	console.log("HELLO")
	console.log("HELLO")
	console.log("HELLO")
	console.log("HELLO")
}


var fn = function() {
	setTimeout(function() {
		(function() {
			
			var fnn = throwIt(function() {
				console.log('not accessible')
			})
		})();
	}, 1000);
}

fn();
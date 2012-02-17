//only catch all if functions have been wrapped around
if(typeof catchall != 'undefined') {

	//on catch all, send error to server
	catchall.error = function(e) {
		console.error('An error has occurred!');
		console.error(e.stack);
	}	
}


function badFunction() {
	unknownFunction();
}

badFunction();

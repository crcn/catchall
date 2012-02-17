var catchall = catchall || {},
thrown = [];

catchall.error = function(e) {


	//errors are re-thrown, so they'll bubble up - need to check if the error was thrown here so it's not re-logged
	if(thrown.indexOf(e) > -1) return;

	//push the errir temporarily
	thrown.push(e);

	//log the error - this can be overridden
	catchall.onerror(e);

	//after a ms, remove the error. errors are thrown in an instant
	setTimeout(function() {

		thrown.splice(thrown.indexOf(e), 1);

	}, 1);
}

catchall.onerror = catchall.onerror || function(e) {
	console.error(e.stack);	
};


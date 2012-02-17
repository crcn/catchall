var catchall = catchall || {
    error: function() {
        try {} catch (e) {
            catchall.error(e);
        }
    }
};

if (typeof catchall != "undefined") {
    catchall.error = function(e) {
        try {
            console.error("An error has occurred!");
            console.error(e.message);
        } catch (e) {
            catchall.error(e);
        }
    };
}

function badFunction() {
    try {
        unknownFunction();
    } catch (e) {
        catchall.error(e);
    }
}

badFunction();
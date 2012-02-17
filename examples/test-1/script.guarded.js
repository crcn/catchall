var catchall = catchall || {
    error: function(err) {
        try {
            console.error(err.stack);
        } catch (e) {
            catchall.error(e);
        }
    }
};

catchall.error = function(e) {
    try {
        console.log("Error!!!");
        console.error(e.message);
    } catch (e) {
        catchall.error(e);
    }
};

function ttt() {
    try {
        console.log("HELLO");
        console.log("HELLO");
        console.log("HELLO");
        console.log("HELLO");
        console.log("HELLO");
        console.log("HELLO");
        console.log("HELLO");
        console.log("HELLO");
        console.log("HELLO");
        console.log("HELLO");
    } catch (e) {
        catchall.error(e);
    }
}

var fn = function() {
    try {
        setTimeout(function() {
            try {
                (function() {
                    try {
                        var fnn = throwIt(function() {
                            try {
                                console.log("not accessible");
                            } catch (e) {
                                catchall.error(e);
                            }
                        });
                    } catch (e) {
                        catchall.error(e);
                    }
                })();
            } catch (e) {
                catchall.error(e);
            }
        }, 1e3);
    } catch (e) {
        catchall.error(e);
    }
};

fn();
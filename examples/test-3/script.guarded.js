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
        console.error("ERR!");
        console.error(e.stack);
    } catch (e) {
        catchall.error(e);
    }
};

var _testName;

function setName(value) {
    try {
        _testName = value.length > 3 ? value : _testName;
    } catch (e) {
        catchall.error(e);
    }
}

function entry(name) {
    try {
        setName(name);
    } catch (e) {
        catchall.error(e);
    }
}

function entry2() {
    try {
        entry(undefined);
    } catch (e) {
        catchall.error(e);
    }
}

entry2();
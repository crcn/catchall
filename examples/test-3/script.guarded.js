var catchall = catchall || {
  onerror: function(err) {
    try {
      console.error(err.stack);
    } catch (e) {
      catchall.onerror(e);
    }
  }
};

catchall.onerror = function(e) {
  try {
    console.error("ERR!");
    console.error(e.stack);
  } catch (e) {
    catchall.onerror(e);
  }
};

var _testName;

function setName(value) {
  try {
    _testName = value.length > 3 ? value : _testName;
  } catch (e) {
    catchall.onerror(e);
  }
}

function entry(name) {
  try {
    setName(name);
  } catch (e) {
    catchall.onerror(e);
  }
}

function entry2() {
  try {
    entry(undefined);
  } catch (e) {
    catchall.onerror(e);
  }
}

entry2();
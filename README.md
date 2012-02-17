## Catch all errors thrown in JavaScript


## Motivation

- better alternative to `window.onerror`. Actually catches *all* exceptions thrown in JavaScript.
- Catch errors where they originate from.
- Ability to send errors to a server while alpha testing.
- Insipired by [proxino](https://www.proxino.com/).

### Super Important Note

All function bodies are wrapped in try-catch blocks, so it would be a **terrible** idea to use this for production code.

## Example

Create a file called `script.js`:

```javascript

//only catch all if functions have been wrapped around
if(typeof catchall != 'undefined') {

	//on catch all, send error to server
	catchall.error = function(e) {
		console.error('An error has occurred!');
		console.error(e.message);
	}	
}


function badFunction() {
	unknownFunction();
}

badFunction();

```

In terminal, type:

```bash
catchall -i ./script.js -o ./script.guarded.js
node ./script.guarded.js
```

The message you should see is:

```
An error has occurred!
unknownFunction is not defined
```

## API


### catchall.wrap(source[, ops], callback)

Generates guarded code where all exceptions are caught.

- `source` - the javascript source to wrap around.
- `ops` - the wrap options.
	- `addHandler` - add the handler at the head of the script (`catchall.error = function(){}`)

Here's a simple example:

```javascript

var catchall = require('catchall');

catchall.wrap('function test(){ notDefined(); }', function(err, wrappedSource) {
	//do stuff
});
```

The above script will produce:

```javascript
function test() {
	try {
		notDefined();
	} catch(e) {
		catchall.error(e);
	}
}
```







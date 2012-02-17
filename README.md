## Catch all errors thrown in JavaScript


## Motivation

- Better stack traces.
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





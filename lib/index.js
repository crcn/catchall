var fs   = require('fs'),
burrito  = require('burrito'),
outcome  = require('outcome'),
uglify = require('uglify-js'),
parser   = uglify.parser;



/**
 * finds an expression based on the filter given
 */

function traverse(ast, filter, filtered) {
	if(!filtered) filtered = [];

	for(var i = ast.length; i--;) {

		var node = ast[i];
		if(!(node instanceof Array)) continue;


		if(filter(node)) {
			filtered.push(node);
		}

		traverse(node, filter, filtered);
	}

	return filtered;
}

/**
 */

function cloneArray(target) {
	return JSON.parse(JSON.stringify(target));
}

/**
 */

function parse(content) {
	return parser.parse(content);
}

/**
 */

function stringify(ast, b) {
	return uglify.uglify.gen_code(ast, { beautify : b });
}

/**
 * wraps the target JS around a shit-ton of try catch blocks. Oh god why >.>...
 */

function wrapWithShitLoadsOfTryCatchBlocks(content, ops) {

	//preprend the error handler if the option is set for it.
	if(ops.addHandler)
	content = "var catchall = catchall || { \
		error: function() {} \
	}" + content;


	var ast = parse(content);

	//first need to find ALL the functions in the given script
	var fns = traverse(ast, function(x) {
		return x[0] == 'defun' || x[0] == 'function';
	}),

	//next we need to parse a try-catch block. this wraps around the function body
	tryCatchAst = traverse(parse('try { } catch(e){ catchall.error(e); }'), function(x) {
		return x[0] == 'try';
	}).pop();


	//finally - need to loop through all the functions and wrap the 
	//bodies in try/catch blocks
	for(var i = fns.length; i--;) {
		var fn = fns[i],
		tryCatchAstClone = cloneArray(tryCatchAst);

		//set the body to the try catch tpl
		tryCatchAstClone[1] = fn[3];

		//set fn body to the try-catch block
		fn[3] = [tryCatchAstClone];

	}

	return ast;

}


/**
 * generates from content 
 */

exports.generate = function(content, ops, callback) {

	if(typeof ops == 'function') {

		callback = ops;
		ops = undefined;

	}

	try {

		//grap the new ast
		var ast = wrapWithShitLoadsOfTryCatchBlocks(content, ops);

		//error not thrown at this point - good, now we can return the result.
		callback(null, stringify(ast, true));

	} catch(e) {

		//uglify-js didn't like the input
		return callback(e);	

	}


	

}

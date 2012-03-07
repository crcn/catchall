var fs   = require('fs'),
outcome  = require('outcome'),
uglify   = require('uglify-js'),
parser   = uglify.parser;



/**
 * finds an expression based on the filter given
 */

function traverse(ast, filtered, filter) {

	var node;


	for(var i = ast.length; i--;) {

		node = ast[i];

		if(!(node instanceof Array)) continue;


		if(filter(node)) {

			filtered.push(node);

		}

		traverse(node, filtered, filter);

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

function stringify(ast, ops) {

	var content = uglify.uglify.gen_code(ast, { beautify : !ops.uglify, indent_level: ops.indent_level || 1 });

	//preprend the error handler if the option is set for it.
	if(ops.add_handler == undefined || ops.add_handler) {
		
		content = fs.readFileSync(__dirname + "/wrap.tpl.js", "utf8") + content;

	}

	return content;

}

/**
 * wraps the target JS around a shit-ton of try catch blocks. Oh god why >.>...
 */

function wrapWithShitLoadsOfTryCatchBlocks(content, ops) {

	var ast, fn, fns, tryCatchAst, tryCatchAstClone, cnt = String(content);




	ast = parse(cnt);

	//first need to find ALL the functions in the given script
	fns = traverse(ast, [], function(x) {

		return x[0] == 'defun' || x[0] == 'function';

	});

	//next we need to parse a try-catch block. this wraps around the function body. 
	tryCatchAst = traverse(parse('try { } catch(e){ throw e; }'), [], function(x) {

		return x[0] == 'try';

	}).pop();


	//finally - need to loop through all the functions and wrap the 
	//bodies in try/catch blocks
	for(var i = fns.length; i--;) {

		fn = fns[i];

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

module.exports = function(source, ops, callback) {

	if(typeof ops == 'function') {

		callback = ops;
		ops = {};

	}

	try {

		var ast = wrapWithShitLoadsOfTryCatchBlocks(source, ops);

		callback(null, stringify(ast, ops));

	} catch(e) {

		//uglify-js didn't like the input
		return callback(e);	

	}


	

}

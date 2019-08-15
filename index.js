/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-08-01
* Updated at  : 2019-08-01
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";



// const JeefoParser    = require("../jeefo_parser"),
const ASTNodes       = require("../jeefo_parser/src/ast_nodes");
const css3_tokenizer = require('../css3_tokenizer');

const CSS3Parser     = require("./css3_parser");
const states_enum    = require("./enums/states_enum");


const css3_ast_nodes = new ASTNodes();

require("./definations")(css3_ast_nodes);

const parser = new CSS3Parser(css3_tokenizer, css3_ast_nodes);
Object.keys(states_enum).forEach((key) => {
    parser.state.add(key, states_enum[key], key === "Rule");
    // parser.state.add(key, states_enum[key]);
});

module.exports = parser;



if (require.main === module) {
	const print_ast_node = require('../jeefo_javascript_parser/src/es5/print_ast_node');

	const fs = require("fs");
	const source = fs.readFileSync("./test", "utf8");
	const ast_nodes = parser.parse(source);

	// console.log("===========================");
	ast_nodes.rules.forEach((rule, ind) => {
    	console.log("\n\n\nRule "+ (ind + 1));
    	console.log(rule);
    	console.log("\n");
		
		rule.selectors.forEach(o => console.log(o.id, o));

    	if(rule.declarations)  {
	    	console.log("\n");
			rule.declarations.forEach(o => console.log(o.id, o));
		}
    	
    	if(rule.sub_rules)  {
	    	console.log("\n");
			rule.sub_rules.forEach(o => console.log(o.id, o));
		}
	});

    process.exit();
}

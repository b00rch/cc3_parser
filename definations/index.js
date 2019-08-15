/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-08-07
* Updated at  : 2019-08-07
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";


module.exports = function register_ast_node_definitions (css3_ast_nodes) {

	require("./delimiters")(css3_ast_nodes);
	require("./skeleton")(css3_ast_nodes);

	css3_ast_nodes.register_ast_node_definition(require("./at_rule"));
	css3_ast_nodes.register_ast_node_definition(require("./rule"));
	css3_ast_nodes.register_ast_node_definition(require("./selector_class"));
	css3_ast_nodes.register_ast_node_definition(require("./selector_pseudo"));
	css3_ast_nodes.register_ast_node_definition(require("./selector_attribute"));
	css3_ast_nodes.register_ast_node_definition(require("./declaration"));
	css3_ast_nodes.register_ast_node_definition(require("./function"));
	css3_ast_nodes.register_ast_node_definition(require("./parenthesis"));

};
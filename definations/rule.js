/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : stylesheet.js
* Created at  : 2019-08-05
* Updated at  : 2019-08-05
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

const states_enum       = require("../enums/states_enum");
const get_rule_block    = require("../helpers/get_rule_block");
const get_selector_list = require("../helpers/get_selector_list");

module.exports = {
	id         : "Rule",
    type       : "Rule",
    precedence : 10,

    is : (current_token, parser) => parser.current_state === states_enum.Rule,

    initialize : (ast_node, current_token, parser) => {
        // SelectorList
        const selectors = get_selector_list(parser);

        // DeclarationList
        get_rule_block(ast_node, parser);

        // Delimiter
        parser.change_state('Token');

        ast_node.selectors    = selectors;
        ast_node.start        = selectors[0].start;
        ast_node.end          = parser.generate_node().end;
    }
}
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
	id         : "At rule",
    type       : "Rule",
    precedence : 11,

    is : (current_token, parser) => {
        if (parser.current_state === states_enum.Rule)  {
            return current_token.id === 'AT';
        }
        return false;
    },

    initialize : (ast_node, current_token, parser) => {
        // SelectorList
        const selectors = get_selector_list(parser, ';');

        if (parser.next_token.value === '{') {
            get_rule_block(ast_node, parser);
        }
        parser.change_state('Token');
        const delimiter = parser.generate_node();

        ast_node.selectors     = selectors;
        ast_node.start         = selectors[0].start;
        ast_node.end           = delimiter.end;
    }
}

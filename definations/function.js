/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : selector.js
* Created at  : 2019-08-07
* Updated at  : 2019-08-07
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

const states_enum        = require("../enums/states_enum");

module.exports = {
	id         : "Function",
    type       : "Token",
    precedence : 3,

    is : (current_token, parser) => {
        switch (parser.current_state) {
            case states_enum.Token:
            case states_enum.Selector:
                return current_token.id === 'Identifier' && current_token.type === 'FUNCTION';
        }
        return false;
    },

    initialize : (ast_node, current_token, parser) => {
        const args = [];

        parser.prepare_next_state('Token', true);
        while (parser.next_token.value !== ')')  {
            args.push(parser.generate_node());
            parser.prepare_next_state('Token', true);
        }
        const delimiter = parser.generate_node();

        ast_node.value = current_token.value;
        ast_node.args  = args;
        ast_node.start = current_token.start;
        ast_node.end   = delimiter.end;
    }
}
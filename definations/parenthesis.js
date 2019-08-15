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
	id         : "Parenthesis",
    type       : "Token",
    precedence : 3,

    is : (current_token, parser) => {
        switch (parser.current_state) {
            case states_enum.Selector:
                return current_token.id === 'Delim' && current_token.value === '(';
        }
        return false;
    },

    initialize : (ast_node, current_token, parser) => {
        const args = [];

        parser.prepare_next_state('Declaration', true);
        while (parser.next_token.value !== ')')  {

            const arg = parser.generate_node();
            args.push(arg);
            
            // if last declaration isn't close, terminate it.
            if (arg.terminate === ')') break;

            parser.prepare_next_state('Declaration', true);
        }
        const delimiter = parser.generate_node();

        ast_node.value = current_token.value;
        ast_node.args  = args;
        ast_node.start = current_token.start;
        ast_node.end   = delimiter.end;
    }
}
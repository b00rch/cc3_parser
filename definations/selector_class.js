/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : selector_class.js
* Created at  : 2019-08-07
* Updated at  : 2019-08-07
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

const states_enum        = require("../enums/states_enum");

module.exports = {
	id         : "Class Selector",
    type       : "Selector",
    precedence : 8,

    is : (current_token, parser) => {
    	if(parser.current_state === states_enum.Selector)  {
    		return current_token.id === 'Delim' && current_token.value === '.';
    	}
    	return false;
    },

    initialize : (ast_node, current_token, parser) => {
        parser.prepare_next_state('Token', true);
        parser.expect('Identifier', parser => parser.next_token.id === 'Identifier');

        const identifier = parser.generate_node();

        ast_node.value = identifier.value;
        ast_node.start = current_token.start;
        ast_node.end   = identifier.end;
    }
}
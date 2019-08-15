/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : selector.js
* Created at  : 2019-08-07
* Updated at  : 2019-08-07
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

const states_enum = require("../enums/states_enum");

module.exports = {
	id         : "Declaration",
    type       : "Declaration",
    precedence : 11,

    is : (current_token, parser) => {
        if (parser.current_state === states_enum.Declaration) {
            return current_token.id === 'Identifier' && current_token.type === 'DECLARATION';
        }
        return false;
    },

    initialize : (ast_node, current_token, parser) => {
        parser.change_state('Token');
        
        const property = parser.generate_node();

        // skip whitespace token
        parser.prepare_next_state('Delimiter', true);
        if (parser.next_token.id === 'WhiteSpace') {
            parser.prepare_next_state('Delimiter', true);
        }

        // Check delimiter
        parser.expect(':', parser => parser.next_token.value === ':');

        // Get values
        const values  = [];
        let important = false;
        let terminate = null;
        parser.prepare_next_state('Token', true);

        while (parser.next_token.value !== ';') {
            if (parser.next_token.value === ')' || parser.next_token.value === '}')  {
                terminate = parser.next_token.value;
                break;
            }
            if (parser.next_token.id === 'Important') {
                important = true;
                parser.prepare_next_state('Token', true);
                continue;
            }
            values.push(parser.generate_node());
            parser.prepare_next_state('Token', true);
        }

        // delete white spaces
        if (values[0].id === 'WhiteSpace') values.shift();

        // console.log("\n\n");
        // console.log(parser.next_ast_node_definition);
        // console.log(parser.next_token.id, (parser.next_token.type || ''), parser.next_token);
        // console.log(values[values.length - 1].id, values[values.length - 1]);
        // process.exit();
        const delimiter = parser.generate_node();

        ast_node.property  = property;
        ast_node.values    = values;
        ast_node.important = important;
        ast_node.terminate = terminate;
        ast_node.start     = property.start;
        ast_node.end       = delimiter.end;
    }
}
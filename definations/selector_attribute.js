/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : selector_attribute.js
* Created at  : 2019-08-07
* Updated at  : 2019-08-07
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

const states_enum        = require("../enums/states_enum");

module.exports = {
    id         : "Attribute Selector",
    type       : "Selector",
    precedence : 8,

    is : (current_token, parser) => {
        if(parser.current_state === states_enum.Selector)  {
            return current_token.id === 'Delim' && current_token.value === '[';
        }
        return false;
    },

    initialize : (ast_node, current_token, parser) => {
        // attribute name
        parser.prepare_next_state('Token', true);
        parser.expect('Identifier', parser => parser.next_token.id === 'Identifier');
        const name = parser.generate_node();

        // matcher
        let matcher          = null;
        let value            = null;
        let case_sensitively = null;

        parser.prepare_next_state('Token', true);
        switch (parser.next_token.id) {
            case 'Delim':
                if(parser.next_token.value !== '=')
                    break;
            case 'Match':
                matcher = parser.generate_node();
                
                // value
                parser.prepare_next_state('Token', true);
                parser.expect('String', parser => parser.next_token.id === 'String');
                value = parser.generate_node();
                
                parser.prepare_next_state('Token', true);
                if (parser.next_token.value === ' ') {
                    parser.prepare_next_state('Token', true);
                    parser.expect('s or i', parser => {
                        return  parser.next_token.value === 's' || 
                                parser.next_token.value === 'i';
                    });
                    case_sensitively = parser.next_token.value;
                    parser.prepare_next_state('Token', true);
                }
        }
        parser.expect(']', parser => parser.next_token.value === ']');
        const delimiter = parser.generate_node();

        ast_node.name             = name;
        ast_node.matcher          = matcher;
        ast_node.value            = value;
        ast_node.case_sensitively = case_sensitively;
        ast_node.start            = current_token.start;
        ast_node.end              = delimiter.end;
    }
}
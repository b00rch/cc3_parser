/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : delimiters.js
* Created at  : 2019-08-07
* Updated at  : 2019-08-07
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

const states_enum = require("../enums/states_enum");

module.exports = function register_delimiter_ast_node_definitions (css3_ast_nodes) {
    css3_ast_nodes.register_ast_node_definition({
        id         : "Delimiter",
        type       : "Delimiter",
        precedence : -1,

        is : (token, parser) => {
            return  token.id             === 'Delim' || 
                    parser.current_state === states_enum.Delimiter
        },

        initialize : (ast_node, current_token, parser) => {
            ast_node.value = current_token.value;
            ast_node.start = current_token.start;
            ast_node.end   = current_token.end;
        }
    });
};

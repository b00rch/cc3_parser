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

module.exports = function register_skeleton_ast_node_definitions (css3_ast_nodes) {

    const token_ast_node_definition = {
        type       : "Token",
        precedence : 2,
        initialize : (ast_node, current_token, parser) => {
            if(current_token.is_bad)  {
                switch (ast_node.id) {
                    case 'Comment':
                        this.throw_unexpected_token("Comment is not closed and it must be one line");
                        break;
                    case 'String':
                        this.throw_unexpected_token("Bad String token");
                        break;
                    case 'URL':
                        this.throw_unexpected_token("Bad URL token");
                        break;
                }
            }

            ast_node.value       = current_token.value;
            ast_node.start       = current_token.start;
            ast_node.end         = current_token.end;
        }
    };

    const make_token_definition = (() => {
        return id => {
            let definition_id;
            switch (id)  {
                case 'Hash':
                    definition_id = 'ID Selector';
                    break;
                case 'AT':
                    definition_id = 'At Selector';
                    break;
                default:
                    definition_id = id; 
            }

            token_ast_node_definition.id = definition_id;
            token_ast_node_definition.is = (current_token, parser) => {
                switch (parser.current_state) {
                    case states_enum.Token:
                    case states_enum.Selector:
                    case states_enum.Declaration:
                        return current_token.id === id;
                }
                return false;
            }
            return token_ast_node_definition;
        };
    })();

    // Tokens
    css3_ast_nodes.register_ast_node_definition(make_token_definition("Important"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("Hash"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("AT"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("Identifier"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("Numeric"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("Match"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("CDO"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("CDC"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("Match"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("String"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("URL"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("Comment"));
    css3_ast_nodes.register_ast_node_definition(make_token_definition("WhiteSpace"));

};

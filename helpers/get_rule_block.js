/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : get_selector_list.js
* Created at  : 2019-08-15
* Updated at  : 2019-08-15
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

module.exports = function (ast_node, parser) {
    parser.expect('{', parser => parser.next_token.value === '{');

    const declarations = [];
    const sub_rules    = [];

    let defination_state = 'Declaration'; // first, get all Declarations

    // Declaration List
    parser.prepare_next_state(defination_state,true);

    while (parser.next_token.value !== '}') {
        // Skip white space
        if (parser.next_token.id === 'WhiteSpace')  {
            parser.prepare_next_state(defination_state, true);
            continue;
        }

        if (defination_state                   === 'Declaration' && 
            parser.next_ast_node_definition.id !== 'Declaration') {
            defination_state = 'Rule';
            parser.change_state('Rule');
        }

        if(defination_state === 'Declaration')  {
            const declaration = parser.generate_node();
            declarations.push(declaration);
            
            // If last child isn't close, terminate it.
            if (declaration.terminate === '}') break;
        }
        else  {
            sub_rules.push(parser.generate_node());
        }

        parser.prepare_next_state(defination_state, true);
    }
    // console.log("\n\n");
    // console.log(parser.next_ast_node_definition);
    // console.log(parser.next_token.id, (parser.next_token.type || ''), parser.next_token);
    // process.exit();

    ast_node.declarations  = declarations;
    ast_node.sub_rules     = sub_rules;
}

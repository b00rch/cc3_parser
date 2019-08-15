/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : parser.js
* Created at  : 2019-08-02
* Updated at  : 2019-08-02
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

const JeefoParser   = require("../jeefo_parser");
// const _parse = JeefoParser.prototype.parse;

class CSS3Parser extends JeefoParser {

	constructor (tokenizer, ast_nodes)  {
		super("CSS3", tokenizer, ast_nodes);
	}

    parse (script, tab_size)  {
        const rules = [];
        this.tokenizer.init(script, tab_size);

        this.prepare_next_state();

        while (this.next_token) {
            // skip white space
            if (this.next_token.id === 'WhiteSpace')  {
                this.prepare_next_state();
                continue;
            }
            
            // console.log("\n\n");
            // console.log(this.next_ast_node_definition);
            // console.log(this.next_token.id);
            const rule = this.generate_node();
            if (rule) {
                rules.push(rule);
            } else {
                this.throw_unexpected_token();
            }

            this.prepare_next_state();
        }

        return  {
            id    : 'Stylesheet',
            type  : 'Stylesheet',
            rules : rules
        };
    }

}

module.exports = CSS3Parser;
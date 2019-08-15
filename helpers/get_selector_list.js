/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : get_selector_list.js
* Created at  : 2019-08-15
* Updated at  : 2019-08-15
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";

module.exports = function (parser, additional_terminator) {

	// SelectorList
    const selectors = [];
    parser.change_state('Selector');

    while (parser.next_token.value !== '{') {
        selectors.push(parser.generate_node());
        parser.prepare_next_state('Selector', true);
        if(additional_terminator &&
           additional_terminator === parser.next_token.value) break;
    }
    // if last selector is whitespace, remove it
    if (selectors[selectors.length - 1].id === 'WhiteSpace') {
        selectors.pop();
    }
    return selectors;
}

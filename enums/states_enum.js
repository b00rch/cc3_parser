/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : states_enum.js
* Created at  : 2019-08-02
* Updated at  : 2019-08-02
* Author      : Boorch
* Purpose     : 
* Description : 
_._._._._._._._._._._._._._._._._._._._._.*/

"use strict";


const keys = [
    "Rule",
    "Token",
    "Selector",
    "Delimiter",
    "Declaration",
];

const states_enum = {};

keys.forEach((key, index) => states_enum[key] = index);

module.exports = states_enum;
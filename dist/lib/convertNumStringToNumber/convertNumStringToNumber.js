"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumStringToNumber = function (str) {
    var num = str.match(/.\d/);
    if (num) {
        return parseInt(num[0], 10);
    }
    return null;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertNumStringToNumber_1 = require("./convertNumStringToNumber");
describe('convertNumStringToNumber', function () {
    it('converts a string that includes numbers to a numeral', function () {
        expect(convertNumStringToNumber_1.convertNumStringToNumber('60min')).toStrictEqual(60);
    });
    it('returns null if no numbers are found', function () {
        expect(convertNumStringToNumber_1.convertNumStringToNumber('bla')).toBeNull();
    });
});

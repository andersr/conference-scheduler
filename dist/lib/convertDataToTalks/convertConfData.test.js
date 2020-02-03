"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertDataToTalks_1 = require("./convertDataToTalks");
describe('convertDataToTalks', function () {
    it('converts a list of talk data to a talks object', function () {
        var EXPECTED = [
            {
                name: 'Proper Unit Tests for Anyone',
                duration: 60,
            },
            {
                name: 'From Java 8 to Java 12',
                duration: 5,
            },
            {
                name: 'Effective DSL (Domain Specific Languages)',
                duration: 30,
            }
        ];
        var MOCK_DATA = "\n        Proper Unit Tests for Anyone 60min\n        From Java 8 to Java 12 lightning\n        Effective DSL (Domain Specific Languages) 30min\n        ";
        expect(convertDataToTalks_1.convertDataToTalks(MOCK_DATA)).toMatchObject(EXPECTED);
    });
});

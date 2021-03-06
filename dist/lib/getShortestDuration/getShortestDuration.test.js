"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getShortestDuration_1 = require("./getShortestDuration");
describe('getShortestDuration', function () {
    it('returns the shortest duration in a collection of talks', function () {
        var MOCK_TALKS = [
            {
                name: 'Proper Unit Tests for Anyone ',
                duration: 60,
            },
            {
                name: 'Why Python? ',
                duration: 45,
            },
            {
                name: 'TDD for Embedded Systems ',
                duration: 30,
            },
            {
                name: 'Dependency Management with Interpreted languages ',
                duration: 45,
            },
            {
                name: 'Effective DSL (Domain Specific Languages) ',
                duration: 60,
            }
        ];
        expect(getShortestDuration_1.getShortestDuration(MOCK_TALKS)).toStrictEqual(30);
    });
    it('returns a duration of 0 if no talks are found', function () {
        expect(getShortestDuration_1.getShortestDuration([])).toStrictEqual(0);
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getShortestDuration_1 = require("./getShortestDuration");
describe('getShortestDuration', function () {
    it('returns the duration of the talk with the shortest duration', function () {
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
        var expected = 30;
        expect(getShortestDuration_1.getShortestDuration(MOCK_TALKS)).toStrictEqual(expected);
    });
    it('returns max talk duration if no talks are found', function () {
        var MOCK_TALKS = [];
        var expected = 0;
        expect(getShortestDuration_1.getShortestDuration(MOCK_TALKS)).toStrictEqual(expected);
    });
});

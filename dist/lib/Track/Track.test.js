"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Track_1 = require("./Track");
var constants_1 = require("../../constants");
describe('Track class', function () {
    it('instantiates a new track', function () {
        var MOCK_TRACK = {
            trackNumber: 1,
            morningSessions: [],
            afternoonSessions: [],
            morningRemainingDuration: constants_1.MORNING_SESSION_DURATION,
            afternoonRemainingDuration: constants_1.AFTERNOON_SESSION_MAX_DURATION,
            morningStartTime: constants_1.MORNING_START_TIME,
            afternoonStarTime: constants_1.AFTERNOON_START_TIME,
            morningCurrentEndTime: constants_1.MORNING_START_TIME,
            afternoonCurrentEndTime: constants_1.AFTERNOON_START_TIME,
        };
        var myTrack = new Track_1.Track(1);
        expect(myTrack).toMatchObject(MOCK_TRACK);
    });
});

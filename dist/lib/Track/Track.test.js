"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Track_1 = require("./Track");
var constants_1 = require("../../constants");
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
var MOCK_TALKS = [
    {
        name: 'Proper Unit Tests for Anyone ',
        duration: 60,
    },
    {
        name: 'Why Python? ',
        duration: 45,
    }
];
describe('Track class', function () {
    it('instantiates a new track', function () {
        var myTrack = new Track_1.Track(1);
        expect(myTrack).toMatchObject(MOCK_TRACK);
    });
    it('allows for adding a talk to a track', function () {
        var myTrack = new Track_1.Track(1);
        myTrack.addTalkToTrack(MOCK_TALKS);
        expect(myTrack.morningSessions.length).toStrictEqual(1);
    });
    it('allows for checking if a track is full', function () {
        var myTrack = new Track_1.Track(1);
        myTrack.addTalkToTrack(MOCK_TALKS);
        var shortestRemainingDuration = 60;
        expect(myTrack.getTrackIsFull(shortestRemainingDuration)).toBeFalsy();
    });
});

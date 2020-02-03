"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSchedule_1 = require("./createSchedule");
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
    }
];
var MOCK_TRACKS = [
    {
        trackNumber: 1,
        morningSessions: [
            {
                name: 'Proper Unit Tests for Anyone',
                duration: 60,
                track: 1,
                session: 'morning',
                scheduledTime: '09:00AM'
            },
            {
                name: 'Why Python?',
                duration: 45,
                track: 1,
                session: 'morning',
                scheduledTime: '10:00AM'
            },
            {
                name: 'TDD for Embedded Systems',
                duration: 30,
                track: 1,
                session: 'morning',
                scheduledTime: '10:45AM'
            },
            {
                name: 'Dependency Management with Interpreted languages',
                duration: 45,
                track: 1,
                session: 'morning',
                scheduledTime: '11:15AM'
            }
        ],
        afternoonSessions: [],
        morningRemainingDuration: 0,
        afternoonRemainingDuration: 25,
        morningStartTime: 540,
        afternoonStarTime: 780,
        morningCurrentEndTime: 720,
        afternoonCurrentEndTime: 995
    },
    {
        trackNumber: 2,
        morningSessions: [],
        afternoonSessions: [],
        morningRemainingDuration: 15,
        afternoonRemainingDuration: 240,
        morningStartTime: 540,
        afternoonStarTime: 780,
        morningCurrentEndTime: 705,
        afternoonCurrentEndTime: 780
    }
];
describe('createSchedule', function () {
    it('converts a collection of talks to a schedule', function () {
        expect(createSchedule_1.createSchedule(MOCK_TALKS)).toStrictEqual(EXPECTED);
    });
});

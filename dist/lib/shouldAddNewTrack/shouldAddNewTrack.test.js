"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shouldAddNewTrack_1 = require("./shouldAddNewTrack");
var Track_1 = require("../Track/Track");
// const MOCK_TALKS = [
//     {
//         name: 'Proper Unit Tests for Anyone ',
//         duration: 60,
//     },
//     {
//         name: 'Why Python? ',
//         duration: 45,
//     },
//     {
//         name: 'TDD for Embedded Systems ',
//         duration: 30,
//     },
//     {
//         name: 'Dependency Management with Interpreted languages ',
//         duration: 45,
//     },
//     { name: 'Effective DSL (Domain Specific Languages) ',
//     duration: 60,
// },
//     { name: 'Java 8, really end of life ',
//     duration: 45, 
//     },
//  { name: 'From Java 8 to Java 12 ',
//     duration: 5,
// },
//   { name: 'Managing Network Latency ',
//     duration: 60,
// },
// { name: 'BDD Gone Mad ',
//     duration: 45,
//  },
//  { name: 'Do you smell that?  (Code Smells) ',
//     duration: 30,
//  },
//  { name: 'Open Office Space or Closets???? ',
//  duration: 30,
// },
// { name: 'Proper Pairing ',
// duration: 45,
// },
// ];
var FULL_MORNING_SESSION = [{
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
        duration: 40,
    }
];
var FULL_AFTERNOON_SESSION = [
    { name: 'Effective DSL (Domain Specific Languages) ',
        duration: 60,
    },
    { name: 'Java 8, really end of life ',
        duration: 45,
    },
    { name: 'Proper Pairing ',
        duration: 45,
    },
    { name: 'Effective Legacy Code Techniques... ',
        duration: 30,
    },
    { name: 'Backends and FrontEnds in JavaScript? ',
        duration: 30,
    },
    { name: 'Modern Build Systems ',
        duration: 30,
    }
];
describe('shouldAddNewTrack', function () {
    it('returns true if there are no tracks', function () {
        var scheduledTracks = [];
        expect(shouldAddNewTrack_1.shouldAddNewTrack(scheduledTracks)).toBeTruthy();
    });
    it('returns true if the time remaining is less than the shortest remaining track duration', function () {
        var track1 = new Track_1.Track(1);
        FULL_MORNING_SESSION.forEach(function (t) { return track1.addToSession('morning', t); });
        FULL_AFTERNOON_SESSION.forEach(function (t) { return track1.addToSession('afternoon', t); });
        var shortestRemaingTalkDuration = 60;
        var scheduledTracks = [track1];
        expect(shouldAddNewTrack_1.shouldAddNewTrack(scheduledTracks, shortestRemaingTalkDuration)).toBeTruthy();
    });
    it('returns true if the current track is full', function () {
        var track1 = new Track_1.Track(1);
        FULL_MORNING_SESSION.forEach(function (t) { return track1.addToSession('morning', t); });
        FULL_AFTERNOON_SESSION.forEach(function (t) { return track1.addToSession('afternoon', t); });
        var shortestRemaingTalkDuration = 60;
        var scheduledTracks = [track1];
        expect(shouldAddNewTrack_1.shouldAddNewTrack(scheduledTracks, shortestRemaingTalkDuration)).toBeTruthy();
    });
});

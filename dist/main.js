"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib/");
var fs_1 = __importDefault(require("fs"));
var MORNING_SESSION_DURATION = 180;
var AFTERNOON_SESSION_MIN_DURATION = MORNING_SESSION_DURATION;
var AFTERNOON_SESSION_MAX_DURATION = 240;
var Track = /** @class */ (function () {
    function Track(num) {
        this.trackNumber = num;
        this.morningSessions = [];
        this.afternoonSessions = [];
        this.isFull = false;
        this.morningRemainingDuration = MORNING_SESSION_DURATION;
        this.afternoonRemainingDuration = AFTERNOON_SESSION_MAX_DURATION;
    }
    Track.prototype.getTrack = function () {
        return ({
            morningSessions: this.morningSessions,
            afternoonSessions: this.afternoonSessions,
        });
    };
    Track.prototype.addToSession = function (type, talk) {
        if (type === 'morning') {
            this.morningSessions.push(__assign(__assign({}, talk), { track: this.trackNumber, session: type, scheduledTime: this.setScheduledTime() }));
            this.morningRemainingDuration = this.morningRemainingDuration - talk.duration;
        }
        else {
            // add check here for between min and max allowed duration
            this.afternoonSessions.push(__assign(__assign({}, talk), { track: this.trackNumber, session: type, scheduledTime: this.setScheduledTime() }));
            this.afternoonRemainingDuration = this.afternoonRemainingDuration - talk.duration;
        }
        if (this.morningRemainingDuration === 0 && this.afternoonRemainingDuration === 0) {
            this.isFull = true;
        }
    };
    Track.prototype.getRemainingDuration = function (type) {
        var allowedDuration = type === 'morning' ? MORNING_SESSION_DURATION : AFTERNOON_SESSION_MAX_DURATION;
        var session = type === 'morning' ? this.morningSessions : this.afternoonSessions;
        var currentDuration = session.reduce(function (acc, t) { return t.duration + acc; }, 0);
        return allowedDuration - currentDuration;
    };
    Track.prototype.setScheduledTime = function () {
        return 'foo';
    };
    Track.prototype.getSessions = function () {
        console.log(' this.morningSessions: ', this.morningSessions);
    };
    return Track;
}());
function getTalkData() {
    var data = fs_1.default.readFileSync('./test.txt', 'utf8');
    return lib_1.convertConfData(data);
}
var talkData = getTalkData();
// console.log('talkData: ', talkData);
function scheduleTalks(count, talks, scheduledTracks) {
    // const unscheduledTalks = talks.filter(talk => !talk.track);
    // console.log('unscheduledTalks: ', unscheduledTalks.length);
    if (scheduledTracks === void 0) { scheduledTracks = []; }
    var remaining = talks.filter(function (talk) { return !talk.track; });
    console.log('remaining: ', remaining.length);
    if (count > 10) {
        console.log('scheduledTracks: ', scheduledTracks);
        // return scheduledTracks;
    }
    if (scheduledTracks.length === 0) {
        scheduledTracks.push(new Track(scheduledTracks.length + 1));
    }
    else if (scheduledTracks[scheduledTracks.length - 1].isFull) {
        scheduledTracks.push(new Track(scheduledTracks.length + 1));
    }
    // if time remaining in the morning, try adding
    if (scheduledTracks[scheduledTracks.length - 1].morningRemainingDuration > 0) {
        var index = talks.findIndex(function (t) { return t.duration <= scheduledTracks[scheduledTracks.length - 1].morningRemainingDuration; });
        console.log('index: ', index);
        if (index) {
            scheduledTracks[scheduledTracks.length - 1].addToSession('morning', talks[index]);
            talks[index].track = scheduledTracks.length + 1;
            scheduledTracks[scheduledTracks.length - 1].getSessions();
        }
    }
    // else if(scheduledTracks[scheduledTracks.length - 1].afternoonRemainingDuration > 0){
    //     const matchingTalk = unscheduledTalks.find(t => t.duration <= scheduledTracks[scheduledTracks.length - 1].morningRemainingDuration);
    //     if (matchingTalk) {
    //         scheduledTracks[scheduledTracks.length - 1].addToSession('afternoon', matchingTalk)
    //     }
    // }
    // console.log('scheduledTracks: ', scheduledTracks);
    return scheduleTalks(count + 1, talks, scheduledTracks);
}
scheduleTalks(0, talkData);
// console.log('scheduledTalks: ', scheduledTalks);

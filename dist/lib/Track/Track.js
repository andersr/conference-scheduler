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
Object.defineProperty(exports, "__esModule", { value: true });
var MORNING_SESSION_DURATION = 180;
// const AFTERNOON_SESSION_MIN_DURATION = MORNING_SESSION_DURATION;
var AFTERNOON_SESSION_MAX_DURATION = 240;
var Track = /** @class */ (function () {
    function Track(num) {
        this.trackNumber = num;
        this.morningSessions = [];
        this.afternoonSessions = [];
        this.morningRemainingDuration = MORNING_SESSION_DURATION;
        this.afternoonRemainingDuration = AFTERNOON_SESSION_MAX_DURATION;
    }
    Track.prototype.getTrack = function () {
        return ({
            morningSessions: this.morningSessions,
            afternoonSessions: this.afternoonSessions,
        });
    };
    Track.prototype.addTalkToTrack = function (talks) {
        var _this = this;
        var index;
        if (this.morningRemainingDuration > 0) {
            index = talks.findIndex(function (t) {
                // console.log('t.duration: ', t.duration);
                // console.log('this.morningRemainingDuration: ', this.morningRemainingDuration);
                return t.duration <= _this.morningRemainingDuration;
            });
            if (index !== -1) {
                // console.log('index: ', index);
                this.addToSession('morning', talks[index]);
            }
        }
        else if (this.afternoonRemainingDuration > 0) {
            index = talks.findIndex(function (t) { return t.duration <= _this.afternoonRemainingDuration; });
            if (index !== -1) {
                this.addToSession('afternoon', talks[index]);
            }
        }
        // console.log('index: ', index);
        return index;
    };
    Track.prototype.addToSession = function (type, talk) {
        if (type === 'morning') {
            this.morningSessions.push(__assign(__assign({}, talk), { track: this.trackNumber, session: type, scheduledTime: this.setScheduledTime() }));
            this.morningRemainingDuration = Math.max(0, this.morningRemainingDuration - talk.duration);
        }
        else {
            // TODO: add check here for between min and max allowed duration
            this.afternoonSessions.push(__assign(__assign({}, talk), { track: this.trackNumber, session: type, scheduledTime: this.setScheduledTime() }));
            this.afternoonRemainingDuration = Math.max(0, this.afternoonRemainingDuration - talk.duration);
        }
        // this.shortestRemainingDuration = this.morningRemainingDuration <= this.afternoonRemainingDuration ? this.morningRemainingDuration : this.afternoonRemainingDuration;
    };
    Track.prototype.setScheduledTime = function () {
        return 'foo';
    };
    Track.prototype.getTrackIsFull = function (shortestRemaingTalkDuration) {
        return this.getNoTimeRemaining() || this.getInufficientTimeRemaining(shortestRemaingTalkDuration);
    };
    Track.prototype.getSessions = function () {
        console.log(' this.morningSessions: ', this.morningSessions);
        console.log(' this.afternoonSessions: ', this.afternoonSessions);
    };
    Track.prototype.getNoTimeRemaining = function () {
        return this.morningRemainingDuration === 0 && this.afternoonRemainingDuration === 0;
    };
    Track.prototype.getInufficientTimeRemaining = function (shortestRemaingTalkDuration) {
        console.log('shortestRemaingTalkDuration: ', shortestRemaingTalkDuration);
        console.log('this.afternoonRemainingDuration: ', this.afternoonRemainingDuration);
        return shortestRemaingTalkDuration > this.morningRemainingDuration && shortestRemaingTalkDuration > this.afternoonRemainingDuration;
    };
    Track.prototype.getShortestTimeRemaining = function () {
        return this.morningRemainingDuration <= this.afternoonRemainingDuration ? this.morningRemainingDuration : this.afternoonRemainingDuration;
    };
    return Track;
}());
exports.Track = Track;

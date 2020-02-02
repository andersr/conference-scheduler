"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib/");
var fs_1 = __importDefault(require("fs"));
function getTalkData() {
    var data = fs_1.default.readFileSync('./test.txt', 'utf8');
    return lib_1.convertConfData(data);
}
var data = getTalkData();
var scheduledTracks = [];
function scheduleTalks(talks, currentTrack) {
    var index = currentTrack.addTalkToTrack(talks);
    if (index === 0 || !!index) {
        talks.splice(index, 1);
    }
    if (talks.length === 0) {
        scheduledTracks.push(currentTrack);
        return scheduledTracks;
    }
    var shortestRemainingDuration = lib_1.getShortestDuration(talks);
    // console.log('shortestRemainingDuration: ', shortestRemainingDuration);
    if (currentTrack.getTrackIsFull(shortestRemainingDuration)) {
        if (currentTrack.trackNumber === 1) {
            currentTrack.afternoonCurrentEndTime;
            console.log(' currentTrack.afternoonCurrentEndTime: ', currentTrack.afternoonCurrentEndTime);
            currentTrack.addNetworkingEvent();
        }
        scheduledTracks.push(currentTrack);
        return scheduleTalks(talks, new lib_1.Track(currentTrack.trackNumber + 1));
    }
    return scheduleTalks(talks, currentTrack);
}
function outputSchedule(tracks) {
    // console.log('tracks: ', tracks);
    tracks.forEach(function (track) {
        console.log(" ");
        console.log("Track " + track.trackNumber + ":");
        track.morningSessions.forEach(function (talk) {
            console.log("      " + talk.scheduledTime + " " + talk.name + " " + (talk.duration === 5 ? 'lightning' : talk.duration + "min"));
        });
        if (track.afternoonSessions.length > 0) {
            console.log('      12:00PM Lunch');
        }
        track.afternoonSessions.forEach(function (talk) {
            console.log("      " + talk.scheduledTime + " " + talk.name + " " + (talk.duration === 5 ? 'lightning' : talk.duration === 0 ? '' : talk.duration + "min"));
        });
        // if (index === 0) {
        //     console.log('      05:00PM Networking Event'); 
        // }
    });
}
var scheduledTalks = scheduleTalks(data, new lib_1.Track(1));
outputSchedule(scheduledTalks);

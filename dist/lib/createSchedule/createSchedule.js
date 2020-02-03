"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Track_1 = require("../Track");
var getShortestDuration_1 = require("../getShortestDuration/getShortestDuration");
exports.createSchedule = function (data) {
    var scheduledTracks = [];
    var scheduleGenerator = function (talks, currentTrack) {
        var index = currentTrack.addTalkToTrack(talks);
        if (index === 0 || !!index) {
            talks.splice(index, 1);
        }
        if (talks.length === 0) {
            scheduledTracks.push(currentTrack);
            return scheduledTracks;
        }
        var shortestRemainingDuration = getShortestDuration_1.getShortestDuration(talks);
        if (currentTrack.getTrackIsFull(shortestRemainingDuration)) {
            if (currentTrack.trackNumber === 1) {
                currentTrack.afternoonCurrentEndTime;
                currentTrack.addNetworkingEvent();
            }
            scheduledTracks.push(currentTrack);
            return scheduleGenerator(talks, new Track_1.Track(currentTrack.trackNumber + 1));
        }
        return scheduleGenerator(talks, currentTrack);
    };
    return scheduleGenerator(data, new Track_1.Track(1));
};

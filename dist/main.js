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
        return scheduledTracks;
    }
    if (currentTrack.getTrackIsFull(lib_1.getShortestDuration(talks))) {
        scheduledTracks.push(currentTrack);
        return scheduleTalks(talks, new lib_1.Track(currentTrack.trackNumber + 1));
    }
    return scheduleTalks(talks, currentTrack);
}
var scheduledTalks = scheduleTalks(data, new lib_1.Track(1));
scheduledTalks.forEach(function (t) { return t.getSessions(); });

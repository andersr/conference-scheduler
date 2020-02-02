"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getShortestDuration(talks) {
    talks.sort(function (a, b) { return a.duration - b.duration; });
    return talks[0] ? talks[0].duration : 0;
}
exports.getShortestDuration = getShortestDuration;

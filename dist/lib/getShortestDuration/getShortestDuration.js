"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getShortestDuration(talks) {
    var durations = talks.map(function (t) { return t.duration; });
    var min = durations.length > 0 ? Math.min.apply(Math, durations) : 0;
    return typeof min === 'number' ? min : 60;
}
exports.getShortestDuration = getShortestDuration;

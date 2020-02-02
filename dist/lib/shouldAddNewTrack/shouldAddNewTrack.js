"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shouldAddNewTrack(scheduledTracks, shortestRemaingTalkDuration) {
    if (scheduledTracks.length === 0) {
        // console.log('ADD FIRST TRACK');
        return true;
    }
    else if (shortestRemaingTalkDuration && scheduledTracks[scheduledTracks.length - 1].getInufficientTimeRemaining(shortestRemaingTalkDuration)) {
        // console.log('INSUFFICIENT TIME: ', 'shortestRemaingTalkDuration: ', shortestRemaingTalkDuration );
        return true;
    }
    else if (scheduledTracks[scheduledTracks.length - 1].getNoTimeRemaining()) {
        // console.log('NO TIME REMAINING ');
        return true;
    }
    return false;
}
exports.shouldAddNewTrack = shouldAddNewTrack;

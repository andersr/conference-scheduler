import { convertConfData, Track, getShortestDuration, outputSchedule } from './lib/'
import { Talk } from './models';
import fs from 'fs';

function getTalkData() {
    const data = fs.readFileSync('./talks.txt', 'utf8');
    return convertConfData(data);
}

const data: Talk[] = getTalkData();
const scheduledTracks: Track[] = [];

function scheduleTalks(talks: Talk[], currentTrack: Track): Track[] {

    const index = currentTrack.addTalkToTrack(talks);
    if (index === 0 || !!index) {
       talks.splice(index,1)
    }

    if (talks.length === 0) {
        scheduledTracks.push(currentTrack);
        return scheduledTracks;
    }
    const shortestRemainingDuration = getShortestDuration(talks);
    if (currentTrack.getTrackIsFull(shortestRemainingDuration)) {
        if (currentTrack.trackNumber === 1) {
            currentTrack.afternoonCurrentEndTime
            currentTrack.addNetworkingEvent();
        }
        scheduledTracks.push(currentTrack);
        return scheduleTalks(talks, new Track(currentTrack.trackNumber + 1))
    }
    
    return scheduleTalks(talks, currentTrack)
}

const scheduledTalks = scheduleTalks(data, new Track(1));
outputSchedule(scheduledTalks);

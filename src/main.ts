import { convertConfData, Track, getShortestDuration } from './lib/'
import { Talk } from './models';
import fs from 'fs';

function getTalkData() {
    const data = fs.readFileSync('./test.txt', 'utf8');
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
        return scheduledTracks;
    }
    
    if (currentTrack.getTrackIsFull(getShortestDuration(talks))) {
        scheduledTracks.push(currentTrack);
        return scheduleTalks(talks, new Track(currentTrack.trackNumber + 1))
    }
    
    return scheduleTalks(talks, currentTrack)
}

const scheduledTalks = scheduleTalks(data, new Track(1));
scheduledTalks.forEach(t => t.getSessions())

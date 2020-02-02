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

function outputSchedule(tracks: Track[]){

    tracks.forEach((track, index) =>{
        console.log(` `);
        console.log(`Track ${track.trackNumber}:`);
        track.morningSessions.forEach((talk) => {
            console.log(`      ${talk.scheduledTime} ${talk.name} ${talk.duration === 5 ? 'lightning' : `${talk.duration}min`}`);
        })
        console.log('      12:00PM Lunch');
        track.afternoonSessions.forEach((talk) => {
            console.log(`      ${talk.scheduledTime} ${talk.name} ${talk.duration === 5 ? 'lightning' : `${talk.duration}min`}`);
        })
        if (index === 0) {
            console.log('      05:00PM Networking Event'); 
        }
    });
}

const scheduledTalks = scheduleTalks(data, new Track(1));
outputSchedule(scheduledTalks);

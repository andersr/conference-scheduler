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
        scheduledTracks.push(currentTrack);
        return scheduledTracks;
    }
    const shortestRemainingDuration = getShortestDuration(talks);
    // console.log('shortestRemainingDuration: ', shortestRemainingDuration);
    if (currentTrack.getTrackIsFull(shortestRemainingDuration)) {
        if (currentTrack.trackNumber === 1) {
            currentTrack.afternoonCurrentEndTime
            console.log(' currentTrack.afternoonCurrentEndTime: ',  currentTrack.afternoonCurrentEndTime);
            currentTrack.addNetworkingEvent();
        }
        scheduledTracks.push(currentTrack);
        return scheduleTalks(talks, new Track(currentTrack.trackNumber + 1))
    }
    
    return scheduleTalks(talks, currentTrack)
}

function outputSchedule(tracks: Track[]){
    // console.log('tracks: ', tracks);

    tracks.forEach((track) =>{
        console.log(` `);
        console.log(`Track ${track.trackNumber}:`);
        track.morningSessions.forEach((talk) => {
            console.log(`      ${talk.scheduledTime} ${talk.name} ${talk.duration === 5 ? 'lightning' : `${talk.duration}min`}`);
        })
        if (track.afternoonSessions.length > 0) {
            console.log('      12:00PM Lunch');
        }
        track.afternoonSessions.forEach((talk) => {
            console.log(`      ${talk.scheduledTime} ${talk.name} ${talk.duration === 5 ? 'lightning' : talk.duration === 0 ? '': `${talk.duration}min`}`);
        })
        // if (index === 0) {
        //     console.log('      05:00PM Networking Event'); 
        // }
    });
}

const scheduledTalks = scheduleTalks(data, new Track(1));
outputSchedule(scheduledTalks);

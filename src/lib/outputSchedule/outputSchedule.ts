import { Track } from '../Track/'

export const outputSchedule = (tracks: Track[]) => {
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
    });
}
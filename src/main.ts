import { convertConfData } from './lib/'
import { Talk, TrackSession } from './models';
import fs from 'fs';

const MORNING_SESSION_DURATION = 180;
const AFTERNOON_SESSION_MIN_DURATION = MORNING_SESSION_DURATION;
const AFTERNOON_SESSION_MAX_DURATION = 240;

class Track {
    public trackNumber: number;
    public morningSessions: Talk[];
    public afternoonSessions: Talk[];
    public morningRemainingDuration: number;
    public afternoonRemainingDuration: number;
    public isFull: boolean;
    
    constructor(num: number){
        this.trackNumber = num;
        this.morningSessions = [];
        this.afternoonSessions = [];
        this.isFull = false;
        this.morningRemainingDuration = MORNING_SESSION_DURATION;
        this.afternoonRemainingDuration = AFTERNOON_SESSION_MAX_DURATION;
    }

    getTrack(){
        return ({
            morningSessions: this.morningSessions,
            afternoonSessions: this.afternoonSessions,
        })
    }

    addToSession(type: TrackSession, talk: Talk){
        if ( type === 'morning') {
            this.morningSessions.push({
                ...talk,
                track: this.trackNumber,
                session: type,
                scheduledTime: this.setScheduledTime(),
            })
            this.morningRemainingDuration = this.morningRemainingDuration - talk.duration;
        } else {
            // add check here for between min and max allowed duration
            this.afternoonSessions.push({
                ...talk,
                track: this.trackNumber,
                session: type,
                scheduledTime: this.setScheduledTime(),
            });
            this.afternoonRemainingDuration = this.afternoonRemainingDuration - talk.duration;
        }

        if (this.morningRemainingDuration === 0 && this.afternoonRemainingDuration === 0) {
            this.isFull = true;
        }
        
    }

    getRemainingDuration(type: TrackSession){
        const allowedDuration = type === 'morning' ? MORNING_SESSION_DURATION : AFTERNOON_SESSION_MAX_DURATION;
        const session =  type === 'morning' ?  this.morningSessions : this.afternoonSessions;
        const currentDuration =  session.reduce((acc, t) => t.duration + acc, 0);

        return allowedDuration - currentDuration;
    }

    setScheduledTime(){
        return 'foo';
    }
}

function getTalkData(){
  const data = fs.readFileSync('./test.txt', 'utf8');
   return convertConfData(data);
}

const talkData: Talk[] = getTalkData();
// console.log('talkData: ', talkData);

function scheduleTalks(count: number, talks: Talk[], scheduledTracks: Track[] = []): Track[] {
    
    const unscheduledTalks = talks.filter(talk => !talk.track);
    console.log('unscheduledTalks: ', unscheduledTalks.length);

    if(unscheduledTalks.length === 0 || count > 10) {
        return scheduledTracks;
    }

    if (scheduledTracks.length === 0) {
        scheduledTracks.push(new Track(scheduledTracks.length + 1));
    } else if(scheduledTracks[scheduledTracks.length - 1].isFull) {
        scheduledTracks.push(new Track(scheduledTracks.length + 1));
    }
    
    // if time remaining in the morning, try adding
    if (scheduledTracks[scheduledTracks.length - 1].morningRemainingDuration > 0) {
    
        const matchingTalk = unscheduledTalks.find(t => t.duration <= scheduledTracks[scheduledTracks.length - 1].morningRemainingDuration);
    
        if (matchingTalk) {
            scheduledTracks[scheduledTracks.length - 1].addToSession('morning', matchingTalk)
        }
    } else if(scheduledTracks[scheduledTracks.length - 1].afternoonRemainingDuration > 0){
      
        const matchingTalk = unscheduledTalks.find(t => t.duration <= scheduledTracks[scheduledTracks.length - 1].morningRemainingDuration);
    
        if (matchingTalk) {
            scheduledTracks[scheduledTracks.length - 1].addToSession('afternoon', matchingTalk)
        }
    }

    return scheduleTalks(count++, unscheduledTalks, scheduledTracks)

}


const scheduledTalks = scheduleTalks(0, talkData);
console.log('scheduledTalks: ', scheduledTalks);

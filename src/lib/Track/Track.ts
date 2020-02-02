import { Talk, TrackSession } from '../../models';

const MORNING_SESSION_DURATION = 180;
// const AFTERNOON_SESSION_MIN_DURATION = MORNING_SESSION_DURATION;
const AFTERNOON_SESSION_MAX_DURATION = 240;

export class Track {
    public trackNumber: number;
    public morningSessions: Talk[];
    public afternoonSessions: Talk[];
    public morningRemainingDuration: number;
    public afternoonRemainingDuration: number;
    
    constructor(num: number){
        this.trackNumber = num;
        this.morningSessions = [];
        this.afternoonSessions = [];
        this.morningRemainingDuration = MORNING_SESSION_DURATION;
        this.afternoonRemainingDuration = AFTERNOON_SESSION_MAX_DURATION;
    }

    getTrack(){
        return ({
            morningSessions: this.morningSessions,
            afternoonSessions: this.afternoonSessions,
        })
    }

    addTalkToTrack(talks: Talk[]) {
        let index;
  
        if (this.morningRemainingDuration > 0) {
            index = talks.findIndex(t => {
                // console.log('t.duration: ', t.duration);
                // console.log('this.morningRemainingDuration: ', this.morningRemainingDuration);
                return t.duration <= this.morningRemainingDuration; 
            });
            if (index !== -1) {
                // console.log('index: ', index);
                this.addToSession('morning', talks[index]);
            }
    
        } else if (this.afternoonRemainingDuration > 0) {
            
            index = talks.findIndex(t => t.duration <= this.afternoonRemainingDuration);
            
            if (index !== -1) {
                this.addToSession('afternoon', talks[index]);
            }
        }

        // console.log('index: ', index);
        return index;
    }

    addToSession(type: TrackSession, talk: Talk){
        if ( type === 'morning') {
            this.morningSessions.push({
                ...talk,
                track: this.trackNumber,
                session: type,
                scheduledTime: this.setScheduledTime(),
            });
            this.morningRemainingDuration = Math.max(0, this.morningRemainingDuration - talk.duration);
        } else {
            // TODO: add check here for between min and max allowed duration
            this.afternoonSessions.push({
                ...talk,
                track: this.trackNumber,
                session: type,
                scheduledTime: this.setScheduledTime(),
            });
            this.afternoonRemainingDuration = Math.max(0, this.afternoonRemainingDuration - talk.duration);
        }
        // this.shortestRemainingDuration = this.morningRemainingDuration <= this.afternoonRemainingDuration ? this.morningRemainingDuration : this.afternoonRemainingDuration;
    }

    setScheduledTime(){
        return 'foo';
    }

    getTrackIsFull(shortestRemaingTalkDuration: number) {
        return this.getNoTimeRemaining() || this.getInufficientTimeRemaining(shortestRemaingTalkDuration);
    }

    getSessions() {
        console.log(' this.morningSessions: ',  this.morningSessions);
        console.log(' this.afternoonSessions: ',  this.afternoonSessions);
    }

    getNoTimeRemaining() {
        return this.morningRemainingDuration === 0 && this.afternoonRemainingDuration === 0;
    }

    getInufficientTimeRemaining(shortestRemaingTalkDuration: number) {
        console.log('shortestRemaingTalkDuration: ', shortestRemaingTalkDuration);
        console.log('this.afternoonRemainingDuration: ', this.afternoonRemainingDuration);
        return shortestRemaingTalkDuration > this.morningRemainingDuration && shortestRemaingTalkDuration > this.afternoonRemainingDuration;
    }
    
    getShortestTimeRemaining() {
        return this.morningRemainingDuration <= this.afternoonRemainingDuration ? this.morningRemainingDuration : this.afternoonRemainingDuration;
    }
}
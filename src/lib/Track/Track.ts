import { Talk, TrackSession } from '../../models';
import { MORNING_SESSION_DURATION, AFTERNOON_SESSION_MAX_DURATION, MORNING_START_TIME, AFTERNOON_START_TIME } from '../../constants';

export class Track {
    public trackNumber: number;
    public morningSessions: Talk[];
    public afternoonSessions: Talk[];
    public morningRemainingDuration: number;
    public afternoonRemainingDuration: number;
    public morningStartTime: number;
    public afternoonStarTime: number;
    public morningCurrentEndTime: number;
    public afternoonCurrentEndTime: number;

    constructor(num: number) {
        this.trackNumber = num;
        this.morningSessions = [];
        this.afternoonSessions = [];
        this.morningRemainingDuration = MORNING_SESSION_DURATION;
        this.afternoonRemainingDuration = AFTERNOON_SESSION_MAX_DURATION;
        this.morningStartTime = MORNING_START_TIME; 
        this.afternoonStarTime = AFTERNOON_START_TIME; 
        this.morningCurrentEndTime = this.morningStartTime;
        this.afternoonCurrentEndTime = this.afternoonStarTime;
    }

    addTalkToTrack(talks: Talk[]) {
        let index;

        if (this.morningRemainingDuration > 0) {
            index = talks.findIndex(t => {
                return t.duration <= this.morningRemainingDuration;
            });
            if (index !== -1) {
                this.addToSession('morning', talks[index]);
            }

        } else if (this.afternoonRemainingDuration > 0) {

            index = talks.findIndex(t => t.duration <= this.afternoonRemainingDuration);

            if (index !== -1) {
                this.addToSession('afternoon', talks[index]);
            }
        }

        return index;
    }

    addToSession(type: TrackSession, talk: Talk) {
        if (type === 'morning') {
            this.morningSessions.push({
                ...talk,
                track: this.trackNumber,
                session: type,
                scheduledTime: this.setScheduledTime('morning', talk.duration),
            });
            this.morningRemainingDuration = Math.max(0, this.morningRemainingDuration - talk.duration);
        } else {
            this.afternoonSessions.push({
                ...talk,
                track: this.trackNumber,
                session: type,
                scheduledTime: this.setScheduledTime('afternoon', talk.duration),
            });
            this.afternoonRemainingDuration = Math.max(0, this.afternoonRemainingDuration - talk.duration);
        }
    }

    setScheduledTime(type: TrackSession, duration: number) {
        const currentEndTime = type === 'morning' ? this.morningCurrentEndTime : this.afternoonCurrentEndTime;
        const hours = Math.floor(currentEndTime / 60);
        const minutes = currentEndTime % 60;
        const isAmPm = currentEndTime >= 720;
        if (type === 'morning') {
            this.morningCurrentEndTime = this.morningCurrentEndTime + duration;
        } else {
            this.afternoonCurrentEndTime = this.afternoonCurrentEndTime + duration;
        }
        return `${hours < 10 ? '0': ''}${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0': ''}${minutes}${isAmPm ? 'PM' : 'AM'}`
    }

    addNetworkingEvent() {
        this.addToSession('afternoon', {
            name: 'Networking Event',
            track: this.trackNumber,
            session: 'afternoon',
            duration: 0,
            scheduledTime: this.setScheduledTime('afternoon', 0),
        })
    }

    getTrackIsFull(shortestRemaingTalkDuration: number) {
        return this.getNoTimeRemaining() || this.getInsufficientTimeRemaining(shortestRemaingTalkDuration);
    }

    private getNoTimeRemaining() {
        return this.morningRemainingDuration === 0 && this.afternoonRemainingDuration === 0;
    }

    private getInsufficientTimeRemaining(shortestRemaingTalkDuration: number) {
        return shortestRemaingTalkDuration > this.morningRemainingDuration && shortestRemaingTalkDuration > this.afternoonRemainingDuration;
    }
}
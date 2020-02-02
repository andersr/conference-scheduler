import { Talk, TrackSession } from '../../models';

const MORNING_SESSION_DURATION = 180;
const AFTERNOON_SESSION_MAX_DURATION = 240;

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
        this.morningStartTime = 540; // 9:00 AM in minutes
        this.afternoonStarTime = 780; // 1:00 PM or 1300 hours in minutes
        this.morningCurrentEndTime = this.morningStartTime;
        this.afternoonCurrentEndTime = this.afternoonStarTime;
    }

    getTrack() {
        return ({
            morningSessions: this.morningSessions,
            afternoonSessions: this.afternoonSessions,
        })
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
            // TODO: add check here for between min and max allowed duration
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
        const isFull = this.getNoTimeRemaining() || this.getInsufficientTimeRemaining(shortestRemaingTalkDuration);
        // if (isFull && this.trackNumber === 1) {
        //     this.addNetworkingEvent();
        // }
        return isFull;
    }

    private getNoTimeRemaining() {
        return this.morningRemainingDuration === 0 && this.afternoonRemainingDuration === 0;
    }

    private getInsufficientTimeRemaining(shortestRemaingTalkDuration: number) {
        return shortestRemaingTalkDuration > this.morningRemainingDuration && shortestRemaingTalkDuration > this.afternoonRemainingDuration;
    }

    // getShortestTimeRemaining() {
    //     return this.morningRemainingDuration <= this.afternoonRemainingDuration ? this.morningRemainingDuration : this.afternoonRemainingDuration;
    // }
}
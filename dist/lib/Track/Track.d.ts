import { Talk, TrackSession } from '../../models';
export declare class Track {
    trackNumber: number;
    morningSessions: Talk[];
    afternoonSessions: Talk[];
    morningRemainingDuration: number;
    afternoonRemainingDuration: number;
    morningStartTime: number;
    afternoonStarTime: number;
    morningCurrentEndTime: number;
    afternoonCurrentEndTime: number;
    constructor(num: number);
    getTrack(): {
        morningSessions: Talk[];
        afternoonSessions: Talk[];
    };
    addTalkToTrack(talks: Talk[]): number | undefined;
    addToSession(type: TrackSession, talk: Talk): void;
    setScheduledTime(type: TrackSession, duration: number): string;
    addNetworkingEvent(): void;
    getTrackIsFull(shortestRemaingTalkDuration: number): boolean;
    private getNoTimeRemaining;
    private getInsufficientTimeRemaining;
}

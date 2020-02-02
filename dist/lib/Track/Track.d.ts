import { Talk, TrackSession } from '../../models';
export declare class Track {
    trackNumber: number;
    morningSessions: Talk[];
    afternoonSessions: Talk[];
    morningRemainingDuration: number;
    afternoonRemainingDuration: number;
    constructor(num: number);
    getTrack(): {
        morningSessions: Talk[];
        afternoonSessions: Talk[];
    };
    addTalkToTrack(talks: Talk[]): number | undefined;
    addToSession(type: TrackSession, talk: Talk): void;
    setScheduledTime(): string;
    getTrackIsFull(shortestRemaingTalkDuration: number): boolean;
    getSessions(): void;
    getNoTimeRemaining(): boolean;
    getInufficientTimeRemaining(shortestRemaingTalkDuration: number): boolean;
    getShortestTimeRemaining(): number;
}

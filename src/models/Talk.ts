import { TrackSession } from './TrackSession';

export interface Talk {
    name: string;
    duration: number;
    track?: number;
    session?: TrackSession;
    scheduledTime?: string;
}
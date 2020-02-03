import { Talk } from '../../models';
import { Track } from '../Track';
import { getShortestDuration } from '../getShortestDuration/getShortestDuration';

export const createSchedule = (data: Talk[]) => {
    const scheduledTracks: Track[] = [];

    const scheduleGenerator = (talks: Talk[], currentTrack: Track): Track[] => {

        const index = currentTrack.addTalkToTrack(talks);
        if (index === 0 || !!index) {
            talks.splice(index, 1)
        }

        if (talks.length === 0) {
            scheduledTracks.push(currentTrack);
            return scheduledTracks;
        }

        const shortestRemainingDuration = getShortestDuration(talks);
        if (currentTrack.getTrackIsFull(shortestRemainingDuration)) {
            if (currentTrack.trackNumber === 1) {
                currentTrack.afternoonCurrentEndTime
                currentTrack.addNetworkingEvent();
            }
            scheduledTracks.push(currentTrack);
            return scheduleGenerator(talks, new Track(currentTrack.trackNumber + 1))
        }

        return scheduleGenerator(talks, currentTrack)
    }

    return scheduleGenerator(data, new Track(1));
}
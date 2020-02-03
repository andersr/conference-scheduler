import { Track } from './Track';
import { MORNING_START_TIME, AFTERNOON_START_TIME, MORNING_SESSION_DURATION, AFTERNOON_SESSION_MAX_DURATION } from '../../constants';

describe('Track class', () => {
      
 it('instantiates a new track', () => {
   const MOCK_TRACK = {
        trackNumber: 1,
        morningSessions: [],
        afternoonSessions: [],
        morningRemainingDuration: MORNING_SESSION_DURATION,
        afternoonRemainingDuration: AFTERNOON_SESSION_MAX_DURATION,
        morningStartTime: MORNING_START_TIME, 
        afternoonStarTime: AFTERNOON_START_TIME,
        morningCurrentEndTime: MORNING_START_TIME,
        afternoonCurrentEndTime: AFTERNOON_START_TIME,
   }
    const myTrack = new Track(1);
   expect(myTrack).toMatchObject(MOCK_TRACK)

  });

});


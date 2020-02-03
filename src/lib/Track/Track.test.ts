import { Track } from './Track';
import { MORNING_START_TIME, AFTERNOON_START_TIME, MORNING_SESSION_DURATION, AFTERNOON_SESSION_MAX_DURATION } from '../../constants';

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

var MOCK_TALKS = [
  {
      name: 'Proper Unit Tests for Anyone ',
      duration: 60,
  },
  {
      name: 'Why Python? ',
      duration: 45,
  }
];

describe('Track class', () => {

  it('instantiates a new track', () => {
    const myTrack = new Track(1);
    expect(myTrack).toMatchObject(MOCK_TRACK)
  });

  it('allows for adding a talk to a track', () => {
    const myTrack = new Track(1);
  
    myTrack.addTalkToTrack(MOCK_TALKS)
    expect(myTrack.morningSessions.length).toStrictEqual(1)
  });

  it('allows for checking if a track is full', () => {
    const myTrack = new Track(1);
  
    myTrack.addTalkToTrack(MOCK_TALKS);
    const shortestRemainingDuration = 60;
    expect(myTrack.getTrackIsFull(shortestRemainingDuration)).toBeFalsy()
  });

});


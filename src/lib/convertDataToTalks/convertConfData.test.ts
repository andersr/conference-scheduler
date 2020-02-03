import { convertDataToTalks } from './convertDataToTalks';
import { Talk } from '../../models';

describe('convertDataToTalks', () => {

  it('converts a list of talk data to a talks object', () => {

    const EXPECTED: Talk[] = [
      {
        name: 'Proper Unit Tests for Anyone',
        duration: 60,
      },
      {
        name: 'From Java 8 to Java 12',
        duration: 5,
      },
      {
        name: 'Effective DSL (Domain Specific Languages)',
        duration: 30,
      }
    ];

    const MOCK_DATA = `
        Proper Unit Tests for Anyone 60min
        From Java 8 to Java 12 lightning
        Effective DSL (Domain Specific Languages) 30min
        `;
    expect(convertDataToTalks(MOCK_DATA)).toMatchObject(EXPECTED);
  });

});


import { getShortestDuration } from './getShortestDuration';
import { Talk } from '../../models';

describe('getShortestDuration', () => {

    it('returns the duration of the talk with the shortest duration', () => {
        const MOCK_TALKS: Talk[] = [
            {
                name: 'Proper Unit Tests for Anyone ',
                duration: 60,
            },
            {
                name: 'Why Python? ',
                duration: 45,
            },
            {
                name: 'TDD for Embedded Systems ',
                duration: 30,
            },
            {
                name: 'Dependency Management with Interpreted languages ',
                duration: 45,
            },
            {
                name: 'Effective DSL (Domain Specific Languages) ',
                duration: 60,
            }
        ];

        const expected = 30;
        expect(getShortestDuration(MOCK_TALKS)).toStrictEqual(expected);
    });

    it('returns max talk duration if no talks are found', () => {
        const MOCK_TALKS: Talk[] = [];

        const expected = 0;
        expect(getShortestDuration(MOCK_TALKS)).toStrictEqual(expected);
    });

});


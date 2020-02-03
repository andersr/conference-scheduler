import { getShortestDuration } from './getShortestDuration';
import { Talk } from '../../models';

describe('getShortestDuration', () => {

    it('returns the shortest duration in a collection of talks', () => {
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

        expect(getShortestDuration(MOCK_TALKS)).toStrictEqual(30);
    });

    it('returns a duration of 0 if no talks are found', () => {
        expect(getShortestDuration([])).toStrictEqual(0);
    });

});


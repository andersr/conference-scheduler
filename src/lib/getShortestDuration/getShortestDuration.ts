import { Talk } from '../../models';

export function getShortestDuration(talks: Talk[]) {
    const durations = talks.map(t => t.duration);
    const min = durations.length > 0 ? Math.min(...durations) : 0;
    return typeof min === 'number' ? min : 60;
}
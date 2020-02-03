import { Talk } from '../../models';
import { convertNumStringToNumber } from '../convertNumStringToNumber/convertNumStringToNumber';

export const convertDataToTalks = (data: string) => {
    const lines = data.split('\n');
    const talks: Talk[] = [];
    
    lines.forEach((line: string) => {
        if (line.match(/lightning/)) {
            const name = line.replace(/lightning/, '');
            talks.push({
                name: name.trim(),
                duration: 5,
            })
        } else {
            const minStr =  line.match(/.\dmin/);
            const name = line.replace(/.\dmin/, '');
            if (minStr) {
                
                const duration = convertNumStringToNumber(minStr[0]);

                if (duration) {         
                    talks.push({
                        name: name.trim(),
                        duration,
                    })
                }

            }
        }
    });

    return talks;

}
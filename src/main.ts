import { convertDataToTalks, outputSchedule, readFile, createSchedule } from './lib/'

(function(){
    
    const data = readFile('./talks.txt');
    if (!data) {
        return;
    }

    const talks = convertDataToTalks(data);
    const scheduledTalks = createSchedule(talks);
    outputSchedule(scheduledTalks);
})();


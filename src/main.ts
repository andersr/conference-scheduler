import { convertConfData, outputSchedule, readFile, createSchedule } from './lib/'

function init(){
    
    const data = readFile('./talks.txt');
    if (!data) {
        return;
    }
    const parsed = convertConfData(data);
    
    const scheduledTalks = createSchedule(parsed);
    outputSchedule(scheduledTalks);
}

init();
// handle error


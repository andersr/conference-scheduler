"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib/");
function init() {
    var data = lib_1.readFile('./talks.txt');
    if (!data) {
        return;
    }
    var talks = lib_1.convertDataToTalks(data);
    var scheduledTalks = lib_1.createSchedule(talks);
    lib_1.outputSchedule(scheduledTalks);
}
init();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib/");
function init() {
    var data = lib_1.readFile('./talks.txt');
    if (!data) {
        return;
    }
    var parsed = lib_1.convertConfData(data);
    var scheduledTalks = lib_1.createSchedule(parsed);
    lib_1.outputSchedule(scheduledTalks);
}
init();
// handle error

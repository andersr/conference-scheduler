"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertNumStringToNumber_1 = require("../convertNumStringToNumber/convertNumStringToNumber");
exports.convertDataToTalks = function (data) {
    var lines = data.split('\n');
    var talks = [];
    lines.forEach(function (line) {
        if (line.match(/lightning/)) {
            var name_1 = line.replace(/lightning/, '');
            talks.push({
                name: name_1.trim(),
                duration: 5,
            });
        }
        else {
            var minStr = line.match(/.\dmin/);
            var name_2 = line.replace(/.\dmin/, '');
            if (minStr) {
                var duration = convertNumStringToNumber_1.convertNumStringToNumber(minStr[0]);
                if (duration) {
                    talks.push({
                        name: name_2.trim(),
                        duration: duration,
                    });
                }
            }
        }
    });
    return talks;
};

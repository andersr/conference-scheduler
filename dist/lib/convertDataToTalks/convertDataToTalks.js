"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertNumStringToNumber_1 = require("../convertNumStringToNumber/convertNumStringToNumber");
exports.convertDataToTalks = function (data) {
    var lines = data.split('\n');
    var talks = [];
    lines.forEach(function (line) {
        if (line.match(/lightning/)) {
            var name = line.replace(/lightning/, '');
            talks.push({
                name: name.trim(),
                duration: 5,
            });
        }
        else {
            var minStr = line.match(/.\dmin/);
            var name = line.replace(/.\dmin/, '');
            if (minStr) {
                var duration = convertNumStringToNumber_1.convertNumStringToNumber(minStr[0]);
                if (duration) {
                    talks.push({
                        name: name.trim(),
                        duration: duration,
                    });
                }
            }
        }
    });
    return talks;
};

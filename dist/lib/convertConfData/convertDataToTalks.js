"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertMinToNum = function (str) {
    var num = str.match(/.\d/);
    if (num) {
        return parseInt(num[0], 10);
    }
    return null;
};
exports.convertDataToTalks = function (data) {
    var lines = data.split('\n');
    var talks = [];
    lines.forEach(function (line) {
        if (line.match(/lightning/)) {
            var name_1 = line.replace(/lightning/, '');
            talks.push({
                name: name_1,
                duration: 5,
            });
        }
        else {
            var minStr = line.match(/.\dmin/);
            var name_2 = line.replace(/.\dmin/, '');
            if (minStr) {
                var duration = convertMinToNum(minStr[0]);
                if (duration) {
                    talks.push({
                        name: name_2,
                        duration: duration,
                    });
                }
            }
        }
    });
    return talks;
};

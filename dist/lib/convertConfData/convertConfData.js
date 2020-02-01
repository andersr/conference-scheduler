"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertMinToNum = function (str) {
    var num = str.match(/.\d/);
    if (num) {
        return parseInt(num[0], 10);
    }
    return null;
};
exports.convertConfData = function (data) {
    var lines = data.split('\n');
    var talks = [];
    lines.forEach(function (line) {
        if (line.match(/lightning/)) {
            var name_1 = line.replace(/lightning/, '');
            talks.push({
                name: name_1,
                time: 5
            });
        }
        else {
            var minStr = line.match(/.\dmin/);
            var name_2 = line.replace(/.\dmin/, '');
            // console.log('time: ', minStr);
            if (minStr) {
                var time = convertMinToNum(minStr[0]);
                console.log(' time: ', time);
                if (time) {
                    talks.push({
                        name: name_2,
                        time: time,
                    });
                }
            }
        }
    });
};

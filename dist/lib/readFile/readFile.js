"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
exports.readFile = function (path) {
    var data;
    try {
        if (!fs_1.default.existsSync(path)) {
            throw new Error("No file named 'talks.txt' found.  Please try again.");
        }
        data = fs_1.default.readFileSync(path, 'utf8');
        if (!data) {
            throw new Error('Sorry, there was a problem reading the file.  Please try again.');
        }
    }
    catch (error) {
        console.log(error.message);
    }
    return data;
};

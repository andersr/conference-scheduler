"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { convertConfData } from './convertConfData';
var mock_fs_1 = __importDefault(require("mock-fs"));
var readFile_1 = require("./readFile");
// mock({
//     './talks.txt': 'some stuff here'
//   });
describe('readFile', function () {
    beforeEach(function () {
        mock_fs_1.default({
            './talks.txt': 'some stuff here'
        });
    });
    afterEach(mock_fs_1.default.restore);
    it('reads in a file named talks.txt', function () {
        var data = readFile_1.readFile('./talks.txt');
        expect(data).toBeDefined();
    });
    it('displays an error if no file is found', function () {
        var data = readFile_1.readFile('./foo.txtt');
        expect(data).toBeUndefined();
    });
    // it("sets talk length to 5 if 'lightning' is found", () => {
    //   expect.hasAssertions();
    // });
    // it("converts a 'NNmin' string to a NN numeral", () => {
    //   expect.hasAssertions();
    // });
    // it("sets the converted numeral to the talk length", () => {
    //   expect.hasAssertions();
    // });  
    // it("return an array of all talks", () => {
    //   expect.hasAssertions();
    // });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const fs_1 = require("fs");
const scoreExtractor_1 = require("./utils/scoreExtractor");
class JSONCrickSheet {
    constructor(file, runningOvers) {
        this.type = "json";
        this.filePath = file;
        this.runningOvers = runningOvers;
    }
    read() {
        var _a;
        let parsedData = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)((0, process_1.cwd)(), this.filePath), "utf8"));
        this.cricObj = {
            totalOvers: 0,
            firstInningsScore: 0,
            secondInningsScore: 0,
        };
        this.cricObj.totalOvers = (_a = parsedData === null || parsedData === void 0 ? void 0 : parsedData.info) === null || _a === void 0 ? void 0 : _a.overs;
        this.cricObj.firstInningsScore = (0, scoreExtractor_1.totalScoreCalculator)(parsedData.innings[0], this.type);
        this.cricObj.secondInningsScore = (0, scoreExtractor_1.secondInningsScoreExtractor)(parsedData.innings[0], this.type, this.runningOvers);
        return this.cricObj;
    }
}
exports.default = JSONCrickSheet;

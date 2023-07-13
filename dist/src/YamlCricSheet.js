"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const yaml = __importStar(require("js-yaml"));
const fs_1 = require("fs");
const scoreExtractor_1 = require("./utils/scoreExtractor");
class YamlCricSheet {
    constructor(file, runningOvers) {
        this.type = "yaml";
        this.filePath = file;
        this.runningOvers = runningOvers;
    }
    read() {
        var _a;
        let parsedData = (0, fs_1.readFileSync)((0, path_1.join)((0, process_1.cwd)(), this.filePath), "utf8");
        let loadedYaml = yaml.load(parsedData);
        this.cricObj = {
            totalOvers: 0,
            firstInningsScore: 0,
            secondInningsScore: 0,
        };
        this.cricObj.totalOvers = (_a = loadedYaml === null || loadedYaml === void 0 ? void 0 : loadedYaml.info) === null || _a === void 0 ? void 0 : _a.overs;
        this.cricObj.firstInningsScore = (0, scoreExtractor_1.totalScoreCalculator)(loadedYaml.innings[0]['1st innings'], this.type);
        this.cricObj.secondInningsScore = (0, scoreExtractor_1.secondInningsScoreExtractor)(loadedYaml.innings[1]['2nd innings'], this.type, this.runningOvers);
        return this.cricObj;
    }
}
exports.default = YamlCricSheet;

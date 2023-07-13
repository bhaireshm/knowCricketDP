"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParserAdapter_1 = __importDefault(require("./src/adapter/ParserAdapter"));
const CrickObjFactory_1 = __importDefault(require("./src/factory/CrickObjFactory"));
const StrategyFactory_1 = __importDefault(require("./src/factory/StrategyFactory"));
const helper_1 = require("./src/utils/helper");
const files = {
    json: {
        path: "./data/matchData.json",
        type: "json"
    },
    yaml: {
        path: "./data/matchData.yaml",
        type: "yaml"
    }
};
const file = files.yaml;
const runningOvers = 10;
try {
    console.log("\n------------------------------");
    // * Factory pattern
    const cricObj = CrickObjFactory_1.default.getCrickSheetObj(file.path, runningOvers, file.type);
    (0, helper_1.print)('\nCricket data', cricObj);
    // * Adapter pattern
    const cricSheetObj = ParserAdapter_1.default.getCricObject(file.path, runningOvers);
    const payload = {
        target: cricSheetObj.firstInningsScore,
        overs: Number(runningOvers),
        resources: 60,
        parScore: 180,
        parOvers: cricSheetObj.totalOvers,
        runsScored: cricSheetObj.secondInningsScore,
        minOvers: 20,
    };
    let currScore, winscore;
    // * Strategy pattern
    const strategy = StrategyFactory_1.default.getStrategy("DL", cricSheetObj);
    currScore = strategy === null || strategy === void 0 ? void 0 : strategy.getCurrentScore();
    winscore = strategy === null || strategy === void 0 ? void 0 : strategy.getWinScore(payload);
    (0, helper_1.print)(`\nDL`, { currScore, winscore });
    const vjdstrategy = StrategyFactory_1.default.getStrategy("VJD", cricSheetObj);
    currScore = vjdstrategy === null || vjdstrategy === void 0 ? void 0 : vjdstrategy.getCurrentScore();
    winscore = vjdstrategy === null || vjdstrategy === void 0 ? void 0 : vjdstrategy.getWinScore(payload);
    (0, helper_1.print)('\nVJD', { currScore, winscore });
}
catch (e) {
    console.error("Something went wrong", e);
}

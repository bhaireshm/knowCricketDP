import ParserAdapter from "./src/adapter/ParserAdapter";
import CrickObjFactory from "./src/factory/CrickObjFactory";
import StrategyFactory from "./src/factory/StrategyFactory";
import { print } from "./src/utils/helper";

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
    const cricObj = CrickObjFactory.getCrickSheetObj(file.path, runningOvers, file.type);
    print('\nCricket data', cricObj);

    // * Adapter pattern
    const cricSheetObj = ParserAdapter.getCricObject(file.path, runningOvers);

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
    const strategy = StrategyFactory.getStrategy("DL", cricSheetObj);
    currScore = strategy?.getCurrentScore();
    winscore = strategy?.getWinScore(payload);
    print(`\nDL`, { currScore, winscore });

    const vjdstrategy = StrategyFactory.getStrategy("VJD", cricSheetObj);
    currScore = vjdstrategy?.getCurrentScore();
    winscore = vjdstrategy?.getWinScore(payload);
    print('\nVJD', { currScore, winscore });

} catch (e) {
    console.error("Something went wrong", e);
}

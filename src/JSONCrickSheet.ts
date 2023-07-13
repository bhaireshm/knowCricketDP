import { join } from "path";
import { cwd } from "process";
import { readFileSync } from "fs";

import { ICrickSheet } from "./interface/ICrickSheet";
import { secondInningsScoreExtractor, totalScoreCalculator } from "./utils/scoreExtractor";

export default class JSONCrickSheet implements ICrickSheet {
    type: string = "json";
    cricObj: any;
    filePath: string;
    runningOvers: number;

    constructor(file: string, runningOvers: number) {
        this.filePath = file;
        this.runningOvers = runningOvers;
    }

    read() {
        let parsedData: any = JSON.parse(readFileSync(join(cwd(), this.filePath), "utf8"));

        this.cricObj = {
            totalOvers: 0,
            firstInningsScore: 0,
            secondInningsScore: 0,
        };

        this.cricObj.totalOvers = parsedData?.info?.overs;

        this.cricObj.firstInningsScore = totalScoreCalculator(
            parsedData.innings[0],
            this.type
        );

        this.cricObj.secondInningsScore = secondInningsScoreExtractor(
            parsedData.innings[0],
            this.type,
            this.runningOvers
        );

        return this.cricObj;
    }
}
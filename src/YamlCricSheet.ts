import { join } from "path";
import { cwd } from "process";
import * as yaml from 'js-yaml';
import { readFileSync } from "fs";

import { ICrickSheet } from "./interface/ICrickSheet";
import { secondInningsScoreExtractor, totalScoreCalculator } from "./utils/scoreExtractor";

export default class YamlCricSheet implements ICrickSheet {
    type: string = "yaml";
    cricObj: any;
    filePath: string;
    runningOvers: number;

    constructor(file: string, runningOvers: number) {
        this.filePath = file;
        this.runningOvers = runningOvers;
    }

    read() {
        let parsedData: any = readFileSync(join(cwd(), this.filePath), "utf8");
        let loadedYaml: any = yaml.load(parsedData);

        this.cricObj = {
            totalOvers: 0,
            firstInningsScore: 0,
            secondInningsScore: 0,
        };

        this.cricObj.totalOvers = loadedYaml?.info?.overs;

        this.cricObj.firstInningsScore = totalScoreCalculator(
            loadedYaml.innings[0]['1st innings'],
            this.type
        );

        this.cricObj.secondInningsScore = secondInningsScoreExtractor(
            loadedYaml.innings[1]['2nd innings'],
            this.type,
            this.runningOvers
        );

        return this.cricObj;
    }
}


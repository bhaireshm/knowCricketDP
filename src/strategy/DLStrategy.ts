import { ICrickSheet } from "../interface/ICrickSheet";
import { IStrategy } from "../interface/IStrategy";

export default class DLStrategy implements IStrategy {
    cricObj: any;

    constructor(cricObj: ICrickSheet) {
        this.cricObj = cricObj;
    }

    getWinScore(payload: any) {
        const { target, overs, resources, parScore, parOvers } = payload;

        // Calculate the resource percentage
        const resourcePercentage = resources / 100;

        // Calculate the revised target score
        const revisedTarget = target * resourcePercentage + 0.5;

        // Calculate the overs remaining in the match
        const remainingOvers = parOvers - overs;

        // Calculate the reduction in target due to the reduction in overs
        const reductionInTarget =
            (parScore - revisedTarget) * (remainingOvers / parOvers);

        // Adjust the revised target score
        const adjustedTarget = revisedTarget + reductionInTarget;

        return Math.round(adjustedTarget);
    }

    getCurrentScore() {
        return this.cricObj.secondInningsScore;
    }
}
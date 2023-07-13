"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DLStrategy {
    constructor(cricObj) {
        this.cricObj = cricObj;
    }
    getWinScore(payload) {
        const { target, overs, resources, parScore, parOvers } = payload;
        // Calculate the resource percentage
        const resourcePercentage = resources / 100;
        // Calculate the revised target score
        const revisedTarget = target * resourcePercentage + 0.5;
        // Calculate the overs remaining in the match
        const remainingOvers = parOvers - overs;
        // Calculate the reduction in target due to the reduction in overs
        const reductionInTarget = (parScore - revisedTarget) * (remainingOvers / parOvers);
        // Adjust the revised target score
        const adjustedTarget = revisedTarget + reductionInTarget;
        return Math.round(adjustedTarget);
    }
    getCurrentScore() {
        return this.cricObj.secondInningsScore;
    }
}
exports.default = DLStrategy;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VJDStrategy {
    constructor(cricObj) {
        this.cricObj = cricObj;
    }
    getWinScore(payload) {
        const { target, overs, resources, parScore, parOvers, minOvers } = payload;
        // Calculate the resource percentage
        const resourcePercentage = resources / 100;
        // Calculate the reduction in overs
        const reductionInOvers = parOvers - overs;
        // Calculate the revised target score
        const revisedTarget = target + (parScore - target) * (reductionInOvers / minOvers);
        // Adjust the revised target score based on resource percentage
        const adjustedTarget = revisedTarget * resourcePercentage;
        return Math.round(adjustedTarget);
    }
    getCurrentScore() {
        return this.cricObj.secondInningsScore;
    }
}
exports.default = VJDStrategy;

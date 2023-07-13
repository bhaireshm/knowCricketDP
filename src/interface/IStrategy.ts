export interface IStrategy {
    cricObj: any;
    getWinScore(runningOvers: number): number;
    getCurrentScore(runningOvers: number): number;
}
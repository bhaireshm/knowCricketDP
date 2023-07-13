"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondInningsScoreExtractor = exports.totalScoreCalculator = void 0;
const totalScoreCalculator = (data, fileType) => {
    var _a;
    let totalScore = 0;
    if ((fileType === null || fileType === void 0 ? void 0 : fileType.toLowerCase()) === "json") {
        data.overs.forEach((over) => {
            var _a;
            (_a = over.deliveries) === null || _a === void 0 ? void 0 : _a.forEach((delivery) => {
                var _a;
                totalScore = totalScore + ((_a = delivery === null || delivery === void 0 ? void 0 : delivery.runs) === null || _a === void 0 ? void 0 : _a.total);
            });
        });
    }
    else {
        (_a = data.deliveries) === null || _a === void 0 ? void 0 : _a.forEach(delivery => {
            var _a;
            totalScore = totalScore + ((_a = Object.values(delivery)[0].runs) === null || _a === void 0 ? void 0 : _a.total);
        });
    }
    return totalScore;
};
exports.totalScoreCalculator = totalScoreCalculator;
const secondInningsScoreExtractor = (data, fileType, runningOver) => {
    let totalScore = 0;
    if ((fileType === null || fileType === void 0 ? void 0 : fileType.toLowerCase()) === "json") {
        data.overs.forEach((over) => {
            if (over.over <= runningOver) {
                over.deliveries.forEach((delivery) => {
                    var _a;
                    totalScore = totalScore + ((_a = delivery === null || delivery === void 0 ? void 0 : delivery.runs) === null || _a === void 0 ? void 0 : _a.total);
                });
            }
        });
    }
    else {
        data.deliveries.forEach(delivery => {
            var _a;
            if (Number(Object.keys(delivery)[0]) < runningOver + 1) {
                totalScore = totalScore + ((_a = Object.values(delivery)[0].runs) === null || _a === void 0 ? void 0 : _a.total);
            }
        });
    }
    return totalScore;
};
exports.secondInningsScoreExtractor = secondInningsScoreExtractor;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataExtractor = void 0;
const scoreExtractor_1 = require("./scoreExtractor");
const dataExtractor = (data, fileType, runningOver) => __awaiter(void 0, void 0, void 0, function* () {
    let cricketObj = {
        totalOvers: 0,
        firstInningsScore: 0,
        secondInningsScore: 0,
    };
    if ((fileType === null || fileType === void 0 ? void 0 : fileType.toLowerCase()) === "json") {
        cricketObj.totalOvers = data.info.overs;
        cricketObj.firstInningsScore = (0, scoreExtractor_1.totalScoreCalculator)(data.innings[0], "json");
        cricketObj.secondInningsScore = (0, scoreExtractor_1.secondInningsScoreExtractor)(data.innings[1], "json", runningOver);
    }
    else {
        cricketObj.totalOvers = data.info.overs;
        cricketObj.firstInningsScore = (0, scoreExtractor_1.totalScoreCalculator)(data.innings[0]["1st innings"], "yaml");
        cricketObj.secondInningsScore = (0, scoreExtractor_1.secondInningsScoreExtractor)(data.innings[1]["1st innings"], "yaml", runningOver);
    }
    return cricketObj;
});
exports.dataExtractor = dataExtractor;

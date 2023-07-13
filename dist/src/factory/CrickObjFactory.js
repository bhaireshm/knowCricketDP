"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JSONCrickSheet_1 = __importDefault(require("../JSONCrickSheet"));
const YamlCricSheet_1 = __importDefault(require("../YamlCricSheet"));
class CrickObjFactory {
    static getCrickSheetObj(file, runningOvers, sheetType) {
        if (sheetType == "json") {
            return new JSONCrickSheet_1.default(file, runningOvers).read();
        }
        if (sheetType == "yaml") {
            return new YamlCricSheet_1.default(file, runningOvers).read();
        }
    }
}
exports.default = CrickObjFactory;

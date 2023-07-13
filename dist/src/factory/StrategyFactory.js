"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DLStrategy_1 = __importDefault(require("../strategy/DLStrategy"));
const VJDStrategy_1 = __importDefault(require("../strategy/VJDStrategy"));
class StrategyFactory {
    static getStrategy(type, cricObj) {
        if (type == "DL")
            return new DLStrategy_1.default(cricObj);
        if (type == "VJD")
            return new VJDStrategy_1.default(cricObj);
    }
}
exports.default = StrategyFactory;

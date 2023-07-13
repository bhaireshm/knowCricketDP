"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const CrickObjFactory_1 = __importDefault(require("./factory/CrickObjFactory"));
class ParserAdapter {
    static getCricObject(file, runningOvers) {
        const ext = (0, path_1.extname)(file);
        return CrickObjFactory_1.default.getCrickSheetObj(file, runningOvers, ext.substring(1));
    }
}
exports.default = ParserAdapter;

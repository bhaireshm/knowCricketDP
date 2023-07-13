import { extname } from "path";
import CrickObjFactory from "../factory/CrickObjFactory";

export default class ParserAdapter {

    static getCricObject(file: string, runningOvers: number) {
        const ext = extname(file);
        return CrickObjFactory.getCrickSheetObj(file, runningOvers, ext.substring(1));
    }
}
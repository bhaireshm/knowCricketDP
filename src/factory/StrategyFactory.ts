import { ICrickSheet } from "../interface/ICrickSheet";

import DLStrategy from "../strategy/DLStrategy";
import VJDStrategy from "../strategy/VJDStrategy";

export default class StrategyFactory {

    static getStrategy(type: string, cricObj: ICrickSheet) {
        if (type == "DL") return new DLStrategy(cricObj);
        if (type == "VJD") return new VJDStrategy(cricObj);
    }

}
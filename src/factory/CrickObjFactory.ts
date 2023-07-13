import JSONCrickSheet from "../JSONCrickSheet";
import YamlCricSheet from "../YamlCricSheet";

export default class CrickObjFactory {

    static getCrickSheetObj(file: string, runningOvers: number, sheetType: string) {

        if (sheetType == "json") {
            return new JSONCrickSheet(file, runningOvers).read();
        }

        if (sheetType == "yaml") {
            return new YamlCricSheet(file, runningOvers).read();
        }
        
    }
}
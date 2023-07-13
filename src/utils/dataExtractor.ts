import { FileData } from "../interface/global";
import {
    totalScoreCalculator,
    secondInningsScoreExtractor,
} from "./scoreExtractor";

interface Data {
    info: {
        overs: number;
    };
    innings: FileData[];
}

const dataExtractor = async (
    data: Data,
    fileType: string,
    runningOver: number
): Promise<{ totalOvers: number; firstInningsScore: number; secondInningsScore: number }> => {
    let cricketObj = {
        totalOvers: 0,
        firstInningsScore: 0,
        secondInningsScore: 0,
    };

    if (fileType?.toLowerCase() === "json") {
        cricketObj.totalOvers = data.info.overs;
        cricketObj.firstInningsScore = totalScoreCalculator(
            data.innings[0],
            "json"
        );
        cricketObj.secondInningsScore = secondInningsScoreExtractor(
            data.innings[1],
            "json",
            runningOver
        );
    } else {
        cricketObj.totalOvers = data.info.overs;
        cricketObj.firstInningsScore = totalScoreCalculator(
            data.innings[0]["1st innings"],
            "yaml"
        );
        cricketObj.secondInningsScore = secondInningsScoreExtractor(
            data.innings[1]["1st innings"],
            "yaml",
            runningOver
        );
    }

    return cricketObj;
};

export { dataExtractor };

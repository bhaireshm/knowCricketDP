const {
  totalScoreCalculator,
  secondInningsScoreExtractor,
} = require("./scoreExtractor");

const dataExtractor = (data, fileType, runningOver) => {
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
      data.innings[0],
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
      data.innings[0]["1st innings"],
      "yaml",
      runningOver
    );
  }

  return cricketObj;
};

module.exports = {
  dataExtractor,
};

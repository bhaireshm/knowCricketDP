const totalScoreCalculator = (data, fileType) => {
  let totalScore = 0;
  if (fileType?.toLowerCase() === "json") {
    data.overs.forEach((over) => {
      over.deliveries.forEach((delivery) => {
        totalScore = totalScore + delivery?.runs?.total;
      });
    });
  } else {
    data.deliveries.forEach((delivery) => {
      totalScore = totalScore + Object.values(delivery)[0].runs?.total;
    });
  }

  return totalScore;
};

const secondInningsScoreExtractor = (data, fileType, runningOver) => {
  let totalScore = 0;
  if (fileType?.toLowerCase() === "json") {
    data.overs.forEach((over) => {
      if (over.over <= runningOver) {
        over.deliveries.forEach((delivery) => {
          totalScore = totalScore + delivery?.runs?.total;
        });
      }
    });
  } else {
    data.deliveries.forEach((delivery) => {
      if (Number(Object.keys(delivery)[0]) < runningOver + 1) {
        totalScore = totalScore + Object.values(delivery)[0].runs?.total;
      }
    });
  }

  return totalScore;
};

module.exports = { totalScoreCalculator, secondInningsScoreExtractor };

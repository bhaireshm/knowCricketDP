import { FileData } from "../interface/global";

const totalScoreCalculator = (data: FileData, fileType?: string): number => {
  let totalScore = 0;
  if (fileType?.toLowerCase() === "json") {
    data.overs.forEach((over) => {
      over.deliveries?.forEach((delivery) => {
        totalScore = totalScore + delivery?.runs?.total!;
      });
    });
  } else {
    data.deliveries?.forEach(delivery => {
      totalScore = totalScore + Object.values(delivery)[0].runs?.total;
    });
  }

  return totalScore;
};

const secondInningsScoreExtractor = (
  data: FileData,
  fileType: string,
  runningOver: number
): number => {

  let totalScore = 0;
  if (fileType?.toLowerCase() === "json") {
    data.overs.forEach((over) => {
      if (over.over <= runningOver!) {
        over.deliveries.forEach((delivery) => {
          totalScore = totalScore + delivery?.runs?.total!;
        });
      }
    });
  } else {
    data.deliveries.forEach(delivery => {
      if (Number(Object.keys(delivery)[0]) < runningOver + 1) {
        totalScore = totalScore + Object.values(delivery)[0].runs?.total;
      }
    });
  }

  return totalScore;
};

// TODO: implement later
// const wicketExtractor = (
//   data: FileData,
//   fileType?: string,
//   runningOver?: number
// ): number => {
//   let totalWickets = 0;
//   if (fileType?.toLowerCase() === "json") {
//     data.overs.forEach((over) => {
//       if (over.over <= runningOver!) {
//         over.deliveries.forEach((delivery) => {
//           totalWickets = totalWickets + delivery?.runs?.total!;
//         });
//       }
//     });
//   } else {
//     Object.entries(data.deliveries).forEach(([key, value]) => {
//       if (Number(key) < runningOver! + 1) {
//         totalWickets = totalWickets + value?.runs?.total!;
//       }
//     });
//   }
//   return totalWickets;
// };

export { totalScoreCalculator, secondInningsScoreExtractor };

const fs = require("fs");
const { dataExtractor } = require("../utils/dataExtractor");

const jsonParser = (file, runningOver) => {
  let parsedData = fs.readFileSync(file, "utf8");
  return dataExtractor(JSON.parse(parsedData), "json", runningOver);
};

module.exports = { jsonParser };

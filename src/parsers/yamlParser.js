const yaml = require("js-yaml");
const fs = require("fs");
const { dataExtractor } = require("../utils/dataExtractor");

const yamlParser = async (file, runningOver) => {
  let yamlFile = fs.readFileSync(file, "utf8");
  let loadedYaml = yaml.load(yamlFile);
  return dataExtractor(loadedYaml, "yaml", runningOver);
};

module.exports = { yamlParser };

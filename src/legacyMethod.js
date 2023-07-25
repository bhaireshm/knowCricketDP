const express = require("express");
const multer = require("multer");
const router = new express.Router();
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

const yamlParser = require("./parsers/yamlParser");
const jsonParser = require("./parsers/jsonParser");
const { calculateDLS } = require("./strategies/dlsMethod");
const { calculateVJD } = require("./strategies/vjdMethod");

router.post("/upload", upload.single("file"), async (req, res) => {
  // Access the uploaded file using req.file
  const file = req.file;
  const {
    body: { runningOver, strategy },
  } = req;

  let responseObject = {
    status: true,
    message: "",
    result: {},
  };

  if (!file) {
    responseObject.status = false;
    responseObject.message = "No file uploaded.";
    res.status(400).send(responseObject);
    return;
  } else if (!runningOver) {
    responseObject.status = false;
    responseObject.message = "Missing running over";
    res.status(400).send(responseObject);
    return;
  } else if (!strategy) {
    responseObject.status = false;
    responseObject.message = "Provide strategy";
    res.status(400).send(responseObject);
    return;
  } else {
    let parsedData = {};
    let finalResult = {};
    try {
      if (file?.originalname?.includes(".json")) {
        responseObject.message = "Json file processed successfully";
        parsedData = await jsonParser.jsonParser(
          file.path,
          Number(runningOver)
        );
        if (strategy?.toLowerCase() === "dl") {
          const payload = {
            target: parsedData.firstInningsScore,
            overs: Number(runningOver),
            resources: 60,
            parScore: 180,
            parOvers: parsedData.totalOvers,
            runsScored: parsedData.secondInningsScore,
          };
          finalResult = calculateDLS(payload);
        } else {
          const payload = {
            target: parsedData.firstInningsScore,
            overs: Number(runningOver),
            resources: 60,
            parScore: 180,
            parOvers: parsedData.totalOvers,
            runsScored: parsedData.secondInningsScore,
            minOvers: 20,
          };
          finalResult = calculateVJD(payload);
        }
      } else {
        responseObject.message = "Yaml file processed successfully";
        parsedData = await yamlParser.yamlParser(
          file.path,
          Number(runningOver)
        );

        const payload = {
          target: parsedData.firstInningsScore,
          overs: Number(runningOver),
          resources: 40,
          parScore: 180,
          parOvers: parsedData.totalOvers,
          runsScored: parsedData.secondInningsScore,
          minOvers: 20,
        };

        if (strategy?.toLowerCase() === "dl") {
          finalResult = calculateDLS(payload);
        } else {
          finalResult = calculateVJD(payload);
        }
      }

      responseObject.status = true;
      responseObject.result = { ...parsedData, targetToWin: finalResult };
      res.status(200).send(responseObject);
    } catch (e) {
      console.log(e);
      responseObject.status = false;
      responseObject.message = "Something went wrong";
      res.status(500).send(responseObject);
    }
  }
});

module.exports = router;

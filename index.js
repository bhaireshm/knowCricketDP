const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 1234;

const legacyRouter = require("./src/legacyMethod");

app.get("/", (req, res) => {
  res.send("Hello People");
});

app.use(legacyRouter);

app.listen(port, () => {
  console.log(`Cricket app running at ${port}`);
});

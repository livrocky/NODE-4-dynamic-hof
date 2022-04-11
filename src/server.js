const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { port } = require("./config");
const app = express();

app.get("/", (request, response) => {
  response.send("<h1> Hello Express </h1>");
});

app.listen(port, () => console.log("express is online", port));

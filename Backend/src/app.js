const express = require("express");
const routes = require("./routes/index.js");
const notFoundHandler = require("./middlewares/notFoundHandler.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

app.use(express.json());
app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

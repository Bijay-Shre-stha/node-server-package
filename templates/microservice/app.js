const express = require("express");
const morgan = require("morgan");
const logger = require("./middlewares/logger.js");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/health", require("./health"));

module.exports = app;

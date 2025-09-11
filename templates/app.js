const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./middlewares/logger.js");
const router = express.Router();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
router.use(logger)

// Routes
app.use("/api/users", require("./routes/userRoutes.js"));

module.exports = app;

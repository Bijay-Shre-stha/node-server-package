const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const logger = require("./middlewares/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");
const router = express.Router();

const app = express();

// Security middleware
app.use(helmet());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { status: 'fail', message: 'Too many requests, please try again later.' },
}));

// General middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(logger);

// Routes
app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/health", require("./health"));

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;

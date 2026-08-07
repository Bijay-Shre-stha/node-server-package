const express = require("express");
const router = express.Router();
const { getConnectionStatus } = require("./config/database");

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Service is healthy",
    timestamp: new Date().toISOString(),
    database: {
      connected: getConnectionStatus(),
      type: process.env.DB_TYPE || "mongodb",
    },
  });
});

module.exports = router;
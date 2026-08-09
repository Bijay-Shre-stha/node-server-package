require("dotenv").config();
const app = require("./app");
const { connectDB, getConnectionStatus } = require("./config/database");
const { syncUserModel } = require("./models/userModel");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Sync Sequelize models if using PostgreSQL or MySQL
    if (process.env.DB_TYPE === "postgresql" || process.env.DB_TYPE === "mysql") {
      await syncUserModel();
      console.log("Database models synchronized ✅");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Microservice running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
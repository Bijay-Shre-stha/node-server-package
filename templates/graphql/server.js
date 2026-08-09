require("dotenv").config();
const http = require("http");
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

    const httpServer = http.createServer(app);

    httpServer.listen(PORT, () => {
      console.log(`🚀 GraphQL server running on http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
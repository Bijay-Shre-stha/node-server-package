require("dotenv").config();

const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");

let sequelize = null;
let isConnected = false;

const connectDB = async () => {
  const dbType = process.env.DB_TYPE || "mongodb";

  try {
    if (dbType === "postgresql") {
      // PostgreSQL connection
      sequelize = new Sequelize(process.env.POSTGRES_URI, {
        dialect: "postgres",
        logging: process.env.NODE_ENV === "development" ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });

      await sequelize.authenticate();
      console.log("PostgreSQL Connected ✅");
      isConnected = true;
    } else if (dbType === "mysql") {
      // MySQL connection
      sequelize = new Sequelize(process.env.MYSQL_URI, {
        dialect: "mysql",
        logging: process.env.NODE_ENV === "development" ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });

      await sequelize.authenticate();
      console.log("MySQL Connected ✅");
      isConnected = true;
    } else {
      // MongoDB connection (default)
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected ✅");
      isConnected = true;
    }
  } catch (error) {
    console.log(`${dbType.toUpperCase()} Connection Error ❌:`, error.message);
    process.exit(1);
  }
};

// Helper to get sequelize instance for models
const getSequelize = () => sequelize;

// Helper to check connection status
const getConnectionStatus = () => isConnected;

// Helper to close connections gracefully
const closeDB = async () => {
  if (sequelize) {
    await sequelize.close();
  }
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  isConnected = false;
};

module.exports = {
  connectDB,
  getSequelize,
  getConnectionStatus,
  closeDB,
  mongoose,
  Sequelize,
};
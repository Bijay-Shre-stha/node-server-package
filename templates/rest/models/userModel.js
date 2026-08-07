/**
 * User Model - Supports MongoDB (Mongoose), PostgreSQL, and MySQL (Sequelize)
 * The database type is determined by the DB_TYPE environment variable
 */

const { mongoose, Sequelize, getSequelize } = require("../config/database");

let UserModel = null;

const initializeUserModel = () => {
  const dbType = process.env.DB_TYPE || "mongodb";

  if (dbType === "postgresql" || dbType === "mysql") {
    // Sequelize model for PostgreSQL/MySQL
    const sequelize = getSequelize();

    if (!sequelize) {
      throw new Error("Sequelize not initialized. Call connectDB() first.");
    }

    UserModel = sequelize.define(
      "User",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: { msg: "Please provide a name" },
          },
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: { msg: "Please provide a valid email" },
            notEmpty: { msg: "Please provide an email" },
          },
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true, // Optional for non-auth templates
        },
      },
      {
        tableName: "users",
        timestamps: true,
        underscored: true,
      }
    );
  } else {
    // Mongoose model for MongoDB
    const userSchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: [true, "Please provide a name"],
        },
        email: {
          type: String,
          required: [true, "Please provide an email"],
          unique: true,
        },
        password: {
          type: String,
          required: false, // Optional for non-auth templates
        },
      },
      { timestamps: true }
    );

    UserModel = mongoose.model("User", userSchema);
  }

  return UserModel;
};

// Initialize the model
const User = initializeUserModel();

// Sync function for Sequelize models
const syncUserModel = async () => {
  const dbType = process.env.DB_TYPE || "mongodb";
  if ((dbType === "postgresql" || dbType === "mysql") && UserModel) {
    await UserModel.sync({ alter: process.env.NODE_ENV === "development" });
  }
};

module.exports = { User, syncUserModel };
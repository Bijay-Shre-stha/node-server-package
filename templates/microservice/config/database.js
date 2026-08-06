const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.log("MongoDB Connection Error ❌:", error);
        process.exit(1);
    }
};
module.exports = connectDB;

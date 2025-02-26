// This is the template model for the user. It is used to create a new user in the database.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
});

// Export the model
module.exports = mongoose.model("User", userSchema);
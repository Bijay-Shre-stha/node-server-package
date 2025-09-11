//This is the controller for the user model. It contains the functions that are called when a user makes a request to the server. It is responsible for handling the request, calling the appropriate service functions, and sending the response back to the user.

const User = require('../models/userModel');

// This function is called when a user makes a request to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// This function is called when a user makes a request to create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
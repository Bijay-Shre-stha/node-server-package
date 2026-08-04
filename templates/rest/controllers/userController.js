const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

// Validation rules for user creation
const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
];

// This function is called when a user makes a request to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

// This function is called when a user makes a request to create a new user
exports.createUser = [
    ...validateUser,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'fail',
                    errors: errors.array(),
                });
            }
            const newUser = await User.create(req.body);
            res.status(201).json({
                status: 'success',
                data: { user: newUser },
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },
];

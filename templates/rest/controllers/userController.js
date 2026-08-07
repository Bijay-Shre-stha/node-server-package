const { body, validationResult } = require("express-validator");
const { User } = require("../models/userModel");

// Validation rules for user creation
const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
];

// This function is called when a user makes a request to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll ? await User.findAll() : await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// This function is called when a user makes a request to get a single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk ? await User.findByPk(req.params.id) : await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
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
          status: "fail",
          errors: errors.array(),
        });
      }
      const newUser = await User.create(req.body);
      res.status(201).json({
        status: "success",
        data: { user: newUser },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  },
];

// This function is called when a user makes a request to update a user
exports.updateUser = async (req, res) => {
  try {
    let user;
    if (User.findByPk) {
      // Sequelize
      user = await User.findByPk(req.params.id);
      if (user) {
        await user.update(req.body);
      }
    } else {
      // Mongoose
      user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// This function is called when a user makes a request to delete a user
exports.deleteUser = async (req, res) => {
  try {
    let user;
    if (User.findByPk) {
      // Sequelize
      user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
      }
    } else {
      // Mongoose
      user = await User.findByIdAndDelete(req.params.id);
    }

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
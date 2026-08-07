const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find existing user - works for both Mongoose and Sequelize
    const existingUser = await User.findOne ? await User.findOne({ where: { email } }) : await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Get user ID - works for both Mongoose (_id) and Sequelize (id)
    const userId = newUser._id || newUser.id;

    const token = jwt.sign(
      { id: userId, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          id: userId,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user - works for both Mongoose and Sequelize
    const user = await User.findOne ? await User.findOne({ where: { email } }) : await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    // Get user ID - works for both Mongoose (_id) and Sequelize (id)
    const userId = user._id || user.id;

    const token = jwt.sign(
      { id: userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          id: userId,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { register, login };
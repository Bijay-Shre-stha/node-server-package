const { User } = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll ? await User.findAll() : await User.find();
    res.status(200).json({ status: "success", data: { users } });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk ? await User.findByPk(req.params.id) : await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ status: "success", data: { user: newUser } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

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
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

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
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
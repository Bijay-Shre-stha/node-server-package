const { User } = require("../models/userModel");

const resolvers = {
  Query: {
    users: async () => {
      return await (User.findAll ? User.findAll() : User.find());
    },
    user: async (_, { id }) => {
      return await (User.findByPk ? User.findByPk(id) : User.findById(id));
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await User.create({ name, email });
    },
    deleteUser: async (_, { id }) => {
      if (User.findByPk) {
        // Sequelize
        const user = await User.findByPk(id);
        if (user) {
          await user.destroy();
        }
      } else {
        // Mongoose
        await User.findByIdAndDelete(id);
      }
      return true;
    },
  },
};

module.exports = resolvers;
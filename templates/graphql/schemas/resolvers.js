const User = require("../models/userModel");

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (_, { id }) => {
            return await User.findById(id);
        },
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            return await User.create({ name, email });
        },
        deleteUser: async (_, { id }) => {
            await User.findByIdAndDelete(id);
            return true;
        },
    },
};

module.exports = resolvers;

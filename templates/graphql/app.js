const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./middlewares/logger.js");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const http = require("http");
const path = require("path");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./resolvers");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(logger);

let server;

async function startApollo() {
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    app.use("/graphql", expressMiddleware(server));
}

startApollo();

module.exports = app;

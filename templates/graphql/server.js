require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

connectDB();

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL server running on http://localhost:${PORT}/graphql`);
});

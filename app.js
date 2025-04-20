const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { authenticateQraphQLAPIs } = require("./middlewares/AuthMiddlware");

dotenv.config({ path: path.join(__dirname, "/config/config.env") });
const app = express();
app.use(cors);

const PORT = process.env.APIS_PORT || 4000;
const GraphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authenticateQraphQLAPIs(req),
  formatError: (err) => {
    return {
      message: err.message,
      code: err?.extensions.code || "INTERNAL SERVER ERROR",
    };
  },
});

const StartServer = async () => {
  try {
    await GraphQLServer.start();
    GraphQLServer.applyMiddleware({ app, path: "/graphql" });
    await connectToDataBase();
    app.listen(PORT, () =>
      console.log(`🚀 Server ready at http://localhost:${PORT}`)
    );
  } catch (error) {}
};

StartServer();

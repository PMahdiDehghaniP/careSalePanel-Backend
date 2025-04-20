const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const path = require("path");
//MiddleWares
const { authenticateQraphQLAPIs } = require("./middlewares/AuthMiddlware");
const errorHanlderMiddleware = require("./middlewares/ErrorHandlerMiddleware");

//Config ENV Variables
dotenv.config({ path: path.join(__dirname, "/config/config.env") });

const app = express();

//Set cors to Prevent CORS Error
app.use(cors);

//Error Hanlder Middleware
app.use(errorHanlderMiddleware);

//BackEnd Port
const PORT = process.env.APIS_PORT || 4000;

//Config Apollo Server
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

//Function To Start The Server
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

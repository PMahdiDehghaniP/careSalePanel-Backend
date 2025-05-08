const express = require("express");
const handleCreateUser = require("../../controllers/createUserControler");
const createUserRoute = express.Router();
createUserRoute.post("createuser", handleCreateUser);
module.exports = createUserRoute;

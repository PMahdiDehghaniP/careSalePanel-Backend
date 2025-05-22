const express = require("express");
const loginUserController = require("../../controllers/loginUserController");
const loginRouter = express.Router();
loginRouter.post("/loginuser", loginUserController);
module.exports = loginRouter;

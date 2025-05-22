const express = require("express");
const {
  loginUserController,
  verifyUserByEmailController,
} = require("../../controllers/loginUserController");

const loginRouter = express.Router();
loginRouter.post("/loginuser", loginUserController);
loginRouter.post("/verifyuser", verifyUserByEmailController);
module.exports = loginRouter;

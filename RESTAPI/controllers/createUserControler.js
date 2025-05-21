const userModel = require("../../models/userModel");
const createUserValidation = require("../../validation/userValidation");
const handleCreateUser = async (req, res, next) => {
  try {
    const userData = await createUserValidation.validate(req.body);

    const { email, username } = req.body;

    const isUserExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!isUserExists) {
      const newUser = new userModel(userData);
      await newUser.save();
      res.status(201).json({
        message: "User Created Successfully",
      });
    } else {
      res.status(409).json({
        message: "User Already Exists",
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = handleCreateUser;

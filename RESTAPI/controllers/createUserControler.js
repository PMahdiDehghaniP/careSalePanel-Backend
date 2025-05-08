const express = require("express");
const { createUserValidation } = require("../../validation/userValidation");
const userModel = require("../../models/userModel");
const handleCreateUser = async (req, res, next) => {
  try {
    const userData = await createUserValidation.validate(req.body);
    const { email, userName } = req.body;
    const isUserUnique = await userModel.findOne({
      $or: [{ email }, { userName }],
    });
    if (isUserUnique) {
      const newUser = new userModel(userData);
      await newUser.save();
      res.status(201).json({
        messgae: "User Created SucessFully",
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = handleCreateUser;

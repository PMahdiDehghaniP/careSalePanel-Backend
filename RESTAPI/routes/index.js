const express = require("express");
const fs = require("fs");
const path = require("path");
const { authenticateRESTAPIs } = require("../../middlewares/AuthMiddlware");
const restApiRoutesProvider = express.Router();
const publicFiles = fs.readdirSync(path.join(__dirname, "public"));
const protectedFiles = fs.readdirSync(path.join(__dirname, "protected"));
publicFiles.forEach((file) => {
  if (file.endsWith("js")) {
    const fileRoute = require(path.join(__dirname, "public", file));
    restApiRoutesProvider.use(fileRoute);
  }
});
if (protectedFiles.length > 0) {
  protectedFiles.forEach((file) => {
    if (file.endsWith("js")) {
      const fileRoute = require(path.join(__dirname, "protected", file));
      restApiRoutesProvider.use(authenticateRESTAPIs, fileRoute);
    }
  });
}
module.exports = restApiRoutesProvider;

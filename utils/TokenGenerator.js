const jsonwebtoken = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jsonwebtoken.sign(
    {
      id: userId,
    },
    process.env.JWT_AUTH_ACCESS_TOKEN,
    { expiresIn: "1d" }
  );
};

const generateIdToken = (idTokenPaylod) => {
  return jsonwebtoken.sign(idTokenPaylod, process.env.JWT_AUTH_ID_TOKEN, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (userId) => {
  return jsonwebtoken.sign(
    {
      id: userId,
    },
    process.env.JWT_AUTH_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
};
module.exports = {
  generateAccessToken,
  generateIdToken,
  generateRefreshToken,
};

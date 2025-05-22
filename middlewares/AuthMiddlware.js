const { AuthenticationError } = require("apollo-server-express");
const JWT = require("jsonwebtoken");
const authenticateRESTAPIs = (req, res, next) => {
  const requestToken = req.headers["authorization"]?.split(" ")[1];
  if (!requestToken) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
  const decodedRequestToken = JWT.decode(
    requestToken,
    process.env.JWT_AUTH_SECRET
  );
  if (!decodedRequestToken) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
  const userId = decodedRequestToken.userId;
  req.userId = userId;
  next();
};
const authenticateQraphQLAPIs = (req) => {
  try {
    const requestToken = req.headers["authorization"]?.split(" ")[1];
    if (!requestToken) {
      throw new AuthenticationError("Token Is Required");
    }
    const decodedRequestToken = JWT.decode(
      requestToken,
      process.env.JWT_AUTH_SECRET
    );
    return { userId: decodedRequestToken.userId };
  } catch (error) {
    throw new AuthenticationError("token is Invalid or Expired");
  }
};

module.exports = {
  authenticateRESTAPIs,
  authenticateQraphQLAPIs,
};

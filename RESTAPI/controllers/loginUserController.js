const userModel = require("../../models/userModel");
const isPasswordMatch = require("../../utils/comparePassword");
const {
  generateIdToken,
  generateRefreshToken,
  generateAccessToken,
} = require("../../utils/TokenGenerator");

const loginUserController = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await userModel.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    const hashedPassword = user.password;
    const isPasswordValid = await isPasswordMatch(password, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid (Username |Email) or Password",
      });
    }
    const idTokenPaylod = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const idToken = generateIdToken(idTokenPaylod);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    return res.status(200).json({
      message: "Login Successfully",
      accessToken,
      idToken,
      refreshToken,
      expiresIn: 86400,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUserController;

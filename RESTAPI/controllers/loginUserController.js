const userModel = require("../../models/userModel");
const isPasswordMatch = require("../../utils/comparePassword");
const sendEmail = require("../../utils/sendEmail");
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
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpiresIn = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendEmail(
      user.email,
      "Verification Code",
      `Hello this  is your verificationCode : ${verificationCode}`
    );
    return res.status(200).json({
      message: "Verification Code Sent Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserByEmailController = async (req, res, next) => {
  try {
    const { usernameOrEmail, verificationCode } = req.body;
    const user = await userModel.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(401).json({
        message: "Invalid Verification Code",
      });
    }
    if (user.verificationCodeExpiresIn < Date.now()) {
      return res.status(401).json({
        message: "Verification Code Expired",
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
    user.verificationCode = undefined;
    user.verificationCodeExpiresIn = undefined;
    await user.save();
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

module.exports = {
  loginUserController,
  verifyUserByEmailController,
};

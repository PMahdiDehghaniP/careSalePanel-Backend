const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  verificationCode: { type: String, required: false },
  verificationCodeExpiresIn: { type: Date, required: false },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const generatedSalt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, generatedSalt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
module.exports = mongoose.model("User", userSchema);

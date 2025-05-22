const bcrypt = require("bcrypt");

const isPasswordMatch = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    return false;
  }
};

module.exports = isPasswordMatch;

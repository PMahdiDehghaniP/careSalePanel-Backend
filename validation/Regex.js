const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9._%+-]+$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~\-]).{8,}$/;
const iranPhoneNumbersRegex = /^\+989\d{9}$/;
module.exports = {
  emailRegex,
  usernameRegex,
  passwordRegex,
  iranPhoneNumbersRegex,
};

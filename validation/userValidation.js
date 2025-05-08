const yup = require("yup");
const { passwordRegex, emailRegex, iranPhoneNumbersRegex } = require("./Regex");

const createUserValidation = yup.object().shape({
  username: yup.string().required().min(4),
  password: yup.string().required().matches(passwordRegex),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required().matches(iranPhoneNumbersRegex),
  email: yup.string().email().required().matches(emailRegex),
});

module.exports = createUserValidation;

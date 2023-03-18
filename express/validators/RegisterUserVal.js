const { check } = require("express-validator");
const RegisterUserVal = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a vaild email").isEmail(),

    check(
      "password",
      "Please enter a password wit 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ];
};

exports.RegisterUserVal = RegisterUserVal;

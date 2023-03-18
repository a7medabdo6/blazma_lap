const { check } = require("express-validator");

module.exports = () => {
  return [
    check("email", "Please include a vaild email").isEmail(),
    check("password", "Please password is required").exists(),
  ];
};

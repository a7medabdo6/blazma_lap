const { check } = require("express-validator");
const postVal = () => {
  return [
    check("username", "username is required").not().isEmpty(),
    check("address", "address is required").not().isEmpty(),
    check("phone_Number", "phone number is required").not().isEmpty(),
    check("phone_Number", "phone must be a number").isNumeric(),

    check("purpose", "purpose is required").not().isEmpty(),
  ];
};

exports.postVal = postVal;

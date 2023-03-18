const { check } = require("express-validator");
const ContactVal = () => {
  return [
    check("username", "username is required").not().isEmpty(),
    check("message", "message is required").not().isEmpty(),
    check("phone_Number", "phone number is required").not().isEmpty(),
    check("phone_Number", "phone must be a number").isNumeric(),
  ];
};

exports.ContactVal = ContactVal;

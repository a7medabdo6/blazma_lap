const { check } = require("express-validator");
const testResultVal = () => {
  return [
    check("customer_id", "customer_id is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
  ];
};

exports.testResultVal = testResultVal;

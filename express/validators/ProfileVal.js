const { check } = require("express-validator");

module.exports = () => {
  return [
    check("status", "status is required").not().isEmpty(),
    check("skills", "skills  is required").not().isEmpty(),
  ];
};

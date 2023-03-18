const { check } = require("express-validator");
const CustomerValaddext = () => {
  return [
    check("nameofExternalReport", " name  is required").not().isEmpty(),

    check("customer_external_report").custom((value, { req }) => {
      if (!req.file)
        throw new Error("customer_external_report Img is required");
      return true;
    }),
  ];
};

exports.CustomerValaddext = CustomerValaddext;

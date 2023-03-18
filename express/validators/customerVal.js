const { check } = require("express-validator");
const CustomerVal = () => {
  return [
    // check("username_ar", " arabic username is required").not().isEmpty(),
    // check("username_en", " english username is required").not().isEmpty(),
    // check("gender", " gender is required").not().isEmpty(),
    // check("birth", "  birth is required").not().isEmpty(),
    check("password", " password  is required").not().isEmpty(),

    // check("passport_Number", "  passport Number is required").not().isEmpty(),
    //check("identity_Number", "  identity Number is required").not().isEmpty(),
    // check("RefOrg", "  Ref Org is required").not().isEmpty(),
    // check("years", "  years is required").not().isEmpty(),
    check("customer_id", "  customer id is required").not().isEmpty(),
    check("test", "  test is required").not().isEmpty(),
    //  check("collectDate", "  collectDate is required").not().isEmpty(),
    // check("reportDate", "  reportDate is required").not().isEmpty(),
    // check("unit", "  unit is required").not().isEmpty(),
    // check("branch", "  branch is required").not().isEmpty(),
    check("border", "  border is required").not().isEmpty(),
    // check("refDoctor", "  refDoctor is required").not().isEmpty(),
    /* check("customer_image").custom((value, { req }) => {
      if (!req.files.customer_image)
        throw new Error("customer Img is required");
      return true; 
    }),*/
    check("customer_report").custom((value, { req }) => {
      if (!req.files.customer_report)
        throw new Error("customer report Img is required");
      return true;
    }),
  ];
};

exports.CustomerVal = CustomerVal;

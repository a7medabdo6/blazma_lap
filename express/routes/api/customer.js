const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  postCustomer,
  allCustomer,
  findallandUpdate,
  deleteOne,
  deletemany,
  oneCustomer,
  oneCustomerReports,
  addExternalReport,
  progressforpdfs,
} = require("../../controllers/CustomerController");
const { Upload } = require("../../middleware/upload");
const { CustomerVal } = require("../../validators/customerVal");
const { CustomerValaddext } = require("../../validators/customerValAddext");
const { testResultVal } = require("../../validators/testResultVAl");
router.get("/allcustomers", auth, allCustomer);
router.get("/result", oneCustomer);
router.post("/customer-results", testResultVal(), oneCustomerReports);
router.post(
  "/addExternalReport",
  auth,

  Upload.single("customer_external_report"),
  CustomerValaddext(),
  addExternalReport,
);
router.post(
  "/post",
  Upload.fields([
    {
      name: "customer_image",
      maxCount: 1,
    },
    {
      name: "customer_report",
      maxCount: 1,
    },
  ]),
  CustomerVal(),
  postCustomer,
);
router.post("/postimage", Upload.single("image"), (req, res) => {
  res.send("images uploaded");
});
router.post(
  "/findoneandUpdate",
  auth,
  Upload.fields([
    {
      name: "customer_image",
      maxCount: 1,
    },
    {
      name: "customer_report",
      maxCount: 1,
    },
  ]),
  CustomerVal(),
  findallandUpdate,
);
router.post("/delete", deleteOne);
router.post("/deletemany", deletemany);

module.exports = router;

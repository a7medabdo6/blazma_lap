const express = require("express");
const router = express.Router();

const {
  RegisterUser,
  finduserandUpdate,
} = require("../../controllers/RegisterController");
const auth = require("../../middleware/auth");
const { RegisterUserVal } = require("../../validators/RegisterUserVal");
//@route  POST api/users
//@desc   Register User
//@access Public
router.post("/", RegisterUserVal(), auth, RegisterUser);
router.post("/edit-password", auth, finduserandUpdate);

module.exports = router;

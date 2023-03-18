const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const authController = require("../../controllers/authController");
const loginVal = require("../../validators/loginVal");

//@route  GET api/auth
//@desc   Test route
//@access Public
/*
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});
*/

//@route  GET api/auth
//@desc   Authenticate user $get token
//@access Public
router.post("/", authController);
module.exports = router;

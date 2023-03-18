const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  allUsers,
  deleteUser,
} = require("../../controllers/getUsersController");
router.get("/allusers", auth, allUsers);
router.post("/users/delete", auth, deleteUser);

module.exports = router;

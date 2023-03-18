const express = require("express");
const router = express.Router();

const {
  postContactus,
  allContactus,
  deleteContact,
  findallandUpdate,
} = require("../../controllers/ContactController");
const { ContactVal } = require("../../validators/contactVal");

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
router.get("/allcontacts", allContactus);

router.post("/post", ContactVal(), postContactus);
router.post("/delete", deleteContact);
router.get("/findallandUpdate", findallandUpdate);

module.exports = router;

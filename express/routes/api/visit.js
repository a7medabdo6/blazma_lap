const express = require("express");
const router = express.Router();
const { Upload } = require("../../middleware/upload");

const {
  postVisit,
  allVisit,
  findallandUpdate,
  deleteVisit,
} = require("../../controllers/VistController");
const { postVal } = require("../../validators/visitVal");

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
router.get("/allvisits", allVisit);
router.post("/delete", deleteVisit);

router.post("/post", Upload.single("file"), postVal(), postVisit);
router.get("/findallandUpdate", findallandUpdate);

module.exports = router;

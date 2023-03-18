const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { User, Profile } = require("../../models");
const { check, validationResult } = require("express-validator");

const ProfileVal = require("../../validators/ProfileVal");
//@route  GET api/profile/me
//@desc   Get current user profile
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    console.log(req.user, "req.user");
    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    profile.populate("user", ["name", "avatar"]);
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error!");
  }
});

//@route  POST api/profile
//@desc   create or update user profile
//@access Private

router.post("/", auth, ProfileVal(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    location,
    status,
    skills,
    bio,
    youtube,
    instgram,
    twitter,
    linkedin,
    facebook,
  } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (bio) profileFields.bio = bio;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instgram) profileFields.social.instgram = instgram;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    //update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: profileFields,
        },
        { new: true }
      );
      return res.json(profile);
    }
    //create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send("Server error");
  }

  res.send(profileFields.skills);
});

//@route  GET api/profile
//@desc   Get all user profiles
//@access public
router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);
    console.log(profiles);

    res.json(profiles);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error!");
  }
});

//@route  GET api/profile/user/:user_id
//@desc   Get profile by  user_id
//@access public

router.get("/user/:user_id", async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    console.log(err);
    res.status(500).send("Server error!");
  }
});

//@route  DELETE api/profile
//@desc   DELETE profile ,user and posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error!");
  }
});

module.exports = router;

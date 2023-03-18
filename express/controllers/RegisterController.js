const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const { User } = require("../models");

const { validationResult } = require("express-validator");

const RegisterUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  var { name, email, password, role } = req.body;
  try {
    // See if user exists
    let user = await User.findAll({
      limit: 1,
      where: {
        //your where conditions, or without them if you need ANY entry
        email,
      },
    });
    console.log(req.user, "user");
    if (user.length > 0) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    console.log(User);
    //Get users gravtar

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    // await user.save();
    console.log(req.user, "req.user.id");

    if (req.user?.role == "employer") {
      return res.status(400).json({
        errors: [{ msg: "you are not allowed to create another employers " }],
      });
    } else if (req.user?.role == "leader") {
      user = await User.create({
        name,
        email,
        role: "employer",
        createdBy: req.user.id,
        nameofParentUser: req.user.name,
        password,
      });
    } else {
      user = await User.create({
        name,
        email,
        role,
        createdBy: req.user?.id,
        nameofParentUser: req.user.name,

        password,
      });
    }

    // Encrypt password

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;

        res.status(200).send("success");
      }
    );
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};

const finduserandUpdate = async (req, res) => {
  try {
    var { password, id } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    if (req.user.role == "superAdmin") {
      let user = await User.update(
        { password: password },
        {
          where: { id: id },
        }
      );
      return res.status(200).send(user);
    }
    let user = await User.update(
      { password: password },
      {
        where: { id: id, createdBy: req.user.id },
      }
    );
    if (user[0] == 0) {
      return res
        .status(402)
        .json({ errors: ["you don't allowed to change this user password"] });
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const Logout = async () => {
  try {
  } catch (error) {}
};
exports.RegisterUser = RegisterUser;
exports.finduserandUpdate = finduserandUpdate;
exports.Logout = Logout;

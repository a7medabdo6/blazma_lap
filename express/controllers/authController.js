const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const bcrypt = require("bcryptjs");
const authmid = require("../middleware/auth");

const { User, Customer } = require("../models");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log(email, "Email");
  try {
    // See if user exists

    let user = await User.findAll({
      limit: 1,

      where: {
        //your where conditions, or without them if you need ANY entry
        email,
      },
      include: [
        {
          model: Customer,
          as: "customer", // <---- HERE
        },
      ],
    });

    if (user.length < 1) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    console.log(user, "user");

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user[0].id,
        name: user[0].name,
        role: user[0].role,
      },
    };
    console.log(payload, "payload");
    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: 72 * 60 * 60 * 1000,
      },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, {
          maxAge: 72 * 60 * 60 * 1000 + Date.now(),
          httpOnly: true,
        });
        res.cookie("expireafter", 10 * 60 * 60 * 1000, {
          httpOnly: false,
        });
        res.json({
          token,
          user: [
            {
              id: user[0].id,
              name: user[0].name,

              email: user[0].email,
              role: user[0].role,
              createdBy: user[0].createdBy,

              customer: user[0].customer.length,
            },
          ],
        });
      }
    );
  } catch (e) {
    res.status(500).send(`server error ${e}`);
  }
};

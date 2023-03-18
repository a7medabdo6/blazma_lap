const env = process.env.NODE_ENV || "development";
const { Contactus } = require("../models");

const { validationResult } = require("express-validator");

const postContactus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var { username, message, phone_Number } = req.body;
  try {
    const contactus = await Contactus.create({
      username,
      message,
      phone_Number,
    });
    res.status(200).send(contactus);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};

const allContactus = async (req, res) => {
  try {
    let contactus = await Contactus.findAll({ order: [["updatedAt", "DESC"]] });
    res.status(200).send(contactus);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const deleteContact = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id, "id");
    let customer = await Contactus.destroy({
      where: {
        // criteria
        id,
      },
    });
    console.log(customer, "customer");

    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const findallandUpdate = async (req, res) => {
  try {
    let Contacts = await Contactus.update(
      { read: 1 },
      {
        where: { read: 0 },
      }
    );
    res.status(200).send(Contacts);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
exports.postContactus = postContactus;
exports.allContactus = allContactus;
exports.deleteContact = deleteContact;
exports.findallandUpdate = findallandUpdate;

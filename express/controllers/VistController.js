const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const { Visit } = require("../models");
const fs = require("fs");
var path = require("path");
const { validationResult } = require("express-validator");

const postVisit = async (req, res) => {
  const file = `${config.domain}/${req.file?.path ? req.file.path : null}`;
  console.log(file, "prescription");
  if (req.hasOwnProperty("fileValidationError")) {
    return res.status(400).json({ errors: [req.fileValidationError] });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var { username, address, phone_Number, purpose } = req.body;
  try {
    const visit = await Visit.create({
      username,
      address,
      phone_Number,
      purpose,
      file: req.file?.path ? file : null,
    });
    res.status(200).send(visit);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};

const allVisit = async (req, res) => {
  try {
    let visits = await Visit.findAll({ order: [["updatedAt", "DESC"]] });
    res.status(200).send(visits);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const findallandUpdate = async (req, res) => {
  try {
    let visits = await Visit.update(
      { read: 1 },
      {
        where: { read: 0 },
      }
    );
    res.status(200).send(visits);
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
const deleteVisit = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id, "id");
    let foundedvisit = await Visit.findAll({ where: { id } });

    if (foundedvisit[0]?.file) {
      const myArray = foundedvisit[0].file.split("/");
      console.log(myArray, "myArray");
      fs.unlink(
        path.join(__dirname, "/../public/images", myArray[3]),
        function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log("File deleted!");
        }
      );
    }

    let visit = await Visit.destroy({
      where: {
        // criteria
        id,
      },
    });
    console.log(visit, "visit");

    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
exports.postVisit = postVisit;
exports.allVisit = allVisit;
exports.findallandUpdate = findallandUpdate;
exports.deleteVisit = deleteVisit;

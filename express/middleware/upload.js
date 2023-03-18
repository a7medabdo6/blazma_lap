const express = require("express");
const multer = require("multer");
var path = require("path");

const fileSorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
var maxSize = 10485760;

const Upload = multer({
  storage: fileSorage,

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    console.log(file, "files");

    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".pdf"
    ) {
      req.fileValidationError = "Only images and pdf are allowed";

      return callback(null, false);
    } else if (ext == "") {
      req.fileValidationError = "Only images and pdf are allowed";
    }
    callback(null, true);
  },
  limits: {
    fileSize: 10485760,
  },
});
exports.Upload = Upload;

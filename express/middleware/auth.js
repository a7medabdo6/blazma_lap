const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
module.exports = (req, res, next) => {
  //Get token from header
  //const token = req.header("x-auth-token");
  //const token = req.headers?.x_auth_token;
  const cookieHeader = req.cookies.token;
  console.log(cookieHeader, "cookieHeader");
  //Check if no token
  if (!cookieHeader) {
    return res.status(401).json({ msg: "No token , authorization denied" });
  }
  //Verify token
  try {
    const decoded = jwt.verify(cookieHeader, config.jwtSecret);
    req.user = decoded.user;
    req.token = cookieHeader;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

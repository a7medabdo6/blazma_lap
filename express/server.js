const express = require("express");
require("./models");
const cookieParser = require("cookie-parser");
const app = express();
var bodyParser = require("body-parser");

const { Upload } = require("./middleware/upload");
var cors = require("cors");
//Connect Database
//Init Middleware
app.use(express.json());
var corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.static("public"));

app.use("/public/images", express.static(__dirname + "/public/images"));

app.get("/test", (req, res) => {
  res.send("test image uploaded ");
});
app.post("/upload", Upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("single image uploaded ");
});
app.use(cookieParser());
app.use("/users", require("./routes/api/users"));
app.use("/login", require("./routes/api/auth"));

app.use("/profile", require("./routes/api/profile"));
app.use("/visit", require("./routes/api/visit"));
app.use("/contact", require("./routes/api/contactus"));
app.use("/customer", require("./routes/api/customer"));
app.use("/", require("./routes/api/getallusers"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ports ${PORT} `);
});

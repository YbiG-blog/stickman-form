require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const ejs = require("ejs");
const formPage = require("./routers/register");
const loginPage = require("./routers/login")
const config = require("./config/config");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


app.get("/api/user/", async (req, res) => {
  try {
    res.status(200).send("api is working....");
  } catch (error) {
    res.status(400).send(`err ${error}`);
  }
});
app.use("/api/user/", formPage);
app.use("/api/user/", loginPage);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running successfully on port : ${port}`);
});

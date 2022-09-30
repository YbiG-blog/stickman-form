require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const formPage = require("./routers/form")
const config = require("./config/config")

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", formPage);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running successfully on port : ${port}`);
});
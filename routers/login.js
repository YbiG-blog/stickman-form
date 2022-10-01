require("dotenv").config();
const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", ({ body }, res) => {
  try {
    const { adminId, password } = body;
    if (adminId === process.env.ADMINID) {
      const pay_load = { _id: process.env.ADMINID };
      const cookie_token = jwt.sign(pay_load, process.env.TOKEN_SECRET_KEY);
      if (password === process.env.ADMINPASS) {
        //add cookie
        res.cookie("jwt_stickman", cookie_token, {
          secure: true,
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.redirect("/api/user/admin");
        return res.status(200).json({
          status: "Login successful!",
          success: true,
          cookie_token: cookie_token,
        });
      } else {
        res.send({ msg: "Wrong Password" });
      }
    } else {
      res.send({ msg: "!Invalid details" });
    }
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});
module.exports = router;

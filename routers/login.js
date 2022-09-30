require("dotenv").config();
const express = require("express");
const router = new express.Router();

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", ({ body }, res) => {
  try {
    const { adminId, password } = body;
    console.log(adminId);
    if (adminId === process.env.ADMINID) {
      if (password === process.env.ADMINPASS) {
        res.redirect("/api/user/admin");
      }
      else{
        res.send("Wrong Password");
      }
    } else {
      res.send("!Invalid details");
    }
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});
module.exports = router;

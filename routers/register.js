const express = require("express");
const router = new express.Router();
const Form = require("../models/form");
const verify = require("../middleware/auth")
const jwtDecode = require("jwt-decode");


router.get("/register", async (req, res) => {
  res.render("register");
});
router.post("/register", async ({ body }, res) => {
  try {
    const { name, mobileNumber } = body;

    const formCreate = new Form({
      name,
      mobileNumber,
    });

    await formCreate.save();
    res.redirect("/api/user/success");
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});
router.get("/admin/databydate/:date", verify, async (req, res) => {
  try {

    const date = req.params.date;
    const UserForm = await Form.find();
    let dataByDate = [];
    UserForm.forEach((e) => {
      if (e.createdAt.toISOString().substring(0, 10) == date) {
        dataByDate.push(e);
      }
    });
    res.render("adminbydate", {
      UserForm: dataByDate,
    });
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});
router.get("/admin", verify, async (req, res) => {
  try {
    // const token = req.cookies.jwt_stickman;
    // console.log(token);
    const UserForm = await Form.find();
    // res.status(200).send(UserForm[0].mobileNumber);
    res.render("admin", {
      UserForm: UserForm,
    });
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});
router.get("/form", async (req, res) => {
  try {
    const UserForm = await Form.find();
    res.status(200).send(UserForm);
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});
router.get("/success", async (req, res) => {
  res.render("success");
});
module.exports = router;

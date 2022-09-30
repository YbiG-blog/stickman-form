const express = require("express");
const router = new express.Router();
const Form = require("../models/form");

router.post("/register", async ({ body }, res) => {
  try {
    const { name, mobileNumber } = body;

    const formCreate = new Form({
      name,
      mobileNumber,
    });

    const saveUserForm = await formCreate.save();
    // sendEmail(email);
    res.status(201).send({
      message: "User Successfully Registered",
      id: saveUserForm._id,
    });
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});
router.get("/register", async ({ body }, res) => {
    try {
  
      const UserForm = await Form.find();
      res.status(201).send({
       UserForm
      });
    } catch (err) {
      res.status(400).send(`err ${err}`);
    }
  });

module.exports = router;

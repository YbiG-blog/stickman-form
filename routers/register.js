const express = require("express");
const router = new express.Router();
const Form = require("../models/form");
const verify = require("../middleware/auth");
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
// router.get("/admin/databy/:token", async (req, res) => {
//   try {
//     const token = req.params.token;
//     const UserData = await Form.find({tokenNumber: token},{
//       mobileNumber:1,name:1,tokenNumber:1
//     });
//     res.render("pdf", {
//       UserForm:  UserData,
//     });
//   } catch (err) {
//     res.status(400).send(`err ${err}`);
//   }
// });
router.get("/admin/databy/:t1/:t2", async (req, res) => {
  try {
    const token = req.params.t2;
    const originalToken = req.params.t1;
    const UserData = await Form.findOne(
      { tokenNumber: token },
      {
        mobileNumber: 1,
        name: 1,
        tokenNumber: 1,
      }
    );

    const originalData = {
      name: UserData.name,
      mobileNumber:
        UserData.mobileNumber[parseInt(originalToken) - parseInt(token)],
      tokenNumber: originalToken,
    };
    console.log(originalData);
    res.render("pdf", {
      UserForm: originalData,
    });
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});
router.get("/admin", verify, async (req, res) => {
  try {
    const UserForm = await Form.find();
    for (let i = 1; i < UserForm.length; i++) {
      let mobileLen = UserForm[i - 1].mobileNumber.length;
      let tokenValue = UserForm[i - 1].tokenNumber + mobileLen;
      await Form.findOneAndUpdate(
        { _id: UserForm[i]._id },
        {
          $set: { tokenNumber: tokenValue },
        }
      );
    }
    res.render("admin", {
      UserForm: UserForm,
    });
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});

router.get("/success", async (req, res) => {
  res.render("success");
});
module.exports = router;

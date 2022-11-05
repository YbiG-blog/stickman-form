const express = require("express");
const router = new express.Router();
const Form = require("../models/form");
const puppeteer = require("puppeteer");
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
    const totalUser = await Form.find();
    tokenNum =
      totalUser[totalUser.length - 1].tokenNumber +
      totalUser[totalUser.length - 1].mobileNumber.length;
    console.log(tokenNum);
    formCreate.tokenNumber = tokenNum;
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
router.get("/admin/databy/:t1/:t2", verify, async (req, res) => {
  try {
    const token = req.params.t2;
    const originalToken = req.params.t1;
    const UserData = await Form.findOne(
      { tokenNumber: token },
      {
        mobileNumber: 1,
        name: 1,
        tokenNumber: 1,
        createdAt: 1,
      }
    );

    const originalData = {
      name: UserData.name,
      mobileNumber:
        UserData.mobileNumber[parseInt(originalToken) - parseInt(token)],
      tokenNumber: originalToken,
      createdDate: UserData.createdAt,
    };
    res.render("pdf", {
      UserForm: originalData,
    });
    // generate pdf through puppeteer
    // (async () => {
    //   const browser = await puppeteer.launch();
    //   const page = await browser.newPage();
    //   await page.goto(
    //     `https://stickman-form.herokuapp.com/api/user/admin/databy/${originalToken}/${token}`,
    //     {
    //       waitUntil: "networkidle2",
    //     }
    //   );
    //   await page.emulateMediaType("screen");
    //   const Pdf = await page.pdf({
    //     path: "download/data.pdf",
    //     printBackground: true,
    //     format: "a4",
    //   });

    //   await browser.close();
    // })();
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});

router.get("/admin", verify, async (req, res) => {
  try {
    const UserForm = await Form.find();
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

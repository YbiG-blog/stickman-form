require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FormSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, , "name is required"],
      minlength: [3, , "Minimum length of name is 3"],
    },
    mobileNumber: [
      {
        value: {
          type: Number,
          required: [true, "Please add mobile"],
          unique: true,
        },
        tokenNumber: {
          type: Number,
          default: 10001,
        },
      },
    ],
  },
  { timestamps: true }
);

const Form = new mongoose.model("Form", FormSchema);
module.exports = Form;

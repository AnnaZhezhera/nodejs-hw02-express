const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlengh: 5,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    // token: {
    //   type: String,
    //   default: null,
    // },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(5).required(),
});

module.exports = {
  User,
  joiSchema,
};

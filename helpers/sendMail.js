const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_TOKEN } = process.env;

sgMail.setApiKey(SENDGRID_API_TOKEN);

const sendEmail = async (data) => {
  const email = { ...data, from: "ann_goit3243@meta.ua" };
  try {
    await sgMail.send(email);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.log("Error in sendMail");
    throw error;
  }
};

module.exports = sendEmail;

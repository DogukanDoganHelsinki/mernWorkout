const User = require("../models/userModel");

//login user
const loginUser = async (req, res) => {
  res.json({ message: "login user route" });
};

//signup user
const signupUser = async (req, res) => {
  res.json({ message: "signup user route" });
};

module.exports = {
  loginUser,
  signupUser,
};

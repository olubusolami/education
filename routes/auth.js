const User = require("../model/register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//register;
const createUser = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json("User Already Exist. Please Login");

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

//login
const loginUser = async (req, res) => {
  //checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Email is not found");

  //password check
  const validPass = await bcrypt.compareSync(req.body.password, user.password);
  if (!validPass) return res.status(400).json("invalid password");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  user.token = token;
  console.log(token);
  return res.status(200).json({ user: user.email, token: token });
};

module.exports = { createUser, loginUser };

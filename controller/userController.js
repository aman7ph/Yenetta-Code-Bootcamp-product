const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ error: "please provide all the fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    //role: "admin",
  });

  if (!user) {
    res.status(400).json({ error: "somthing went wrong" });
  }
  res.status(201).json({
    id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ error: "invalid credential" });
  }
};
const getProfile = (req, res) => {
  res.status(200).json(req.user);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });
};
module.exports = { signUp, login, getProfile };

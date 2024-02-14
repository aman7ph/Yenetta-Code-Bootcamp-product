const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.header.authorization &&
    req.header.authorization.startWith("Bearer")
  ) {
    try {
      token = req.header.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.PRIVATE_KEY);
      req.user = await User.findById(decode.id);

      next();
    } catch (error) {
      res.status(401).json({ error: "Not autorized" });
    }
  }
  if (!token) {
    res.status(401).json({ error: "Token not found" });
  }
});

module.exports = { protect };

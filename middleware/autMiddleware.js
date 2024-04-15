const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.PRIVATE_KEY);
      const user = await User.findById(decode.id).select("-password");
      if (!user) {
        return res.status(401).json({ error: "Not autorized" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Not autorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }
});

module.exports = { protect };

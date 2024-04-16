const adminAut = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Protected only for admin" });
  }
};

module.exports = {
  adminAut,
};

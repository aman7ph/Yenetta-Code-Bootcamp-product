const express = require("express");
const { protect } = require("../middleware/autMiddleware");
const router = express.Router();

const { signUp, login, getProfile } = require("../controller/userController");

router.route("/").post(signUp);
router.route("/login").post(login);
router.route("/profile").get(protect, getProfile);

module.exports = router;

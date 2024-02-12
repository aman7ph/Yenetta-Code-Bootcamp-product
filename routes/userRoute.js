const express = require("express");
const router = express.Router();

const { signUp, login, getProfile } = require("../controller/userController");

router.route("/").post(signUp);
router.route("/login").post(login);
router.route("/profile").get(getProfile);

module.exports = router;

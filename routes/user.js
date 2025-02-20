const express = require("express");
const {handleUserLogin, handleUserSignup, handleDisplaySignup, handleDisplayLogin} = require("../controllers/user");

const router = express.Router();

router.route("/signup").get(handleDisplaySignup).post(handleUserSignup);

router.route("/login").get(handleDisplayLogin).post(handleUserLogin);

module.exports = router;
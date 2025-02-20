const express = require("express");
const {handleUserLogin, handleUserSignup, handleDisplaySignup, handleDisplayLogin} = require("../controllers/user");

const router = express.Router();

router.route("/signup").post(handleUserSignup);

router.route("/login").post(handleUserLogin);

module.exports = router;
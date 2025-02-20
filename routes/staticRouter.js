const express = require("express");
const {handleGetAllUrls} = require("../controllers/url");
const {handleDisplayLogin, handleDisplaySignup} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUrls);
router.route("/signup").get(handleDisplaySignup);
router.route("/login").get(handleDisplayLogin);

module.exports = router;
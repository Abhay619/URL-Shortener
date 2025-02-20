const express = require("express");
const {handleCreateShortId, handleRedirectUrl, handleAnalyticsUrl,handleGetAllUrls} = require("../controllers/url");

const router = express.Router();

router.route("/").post(handleCreateShortId);

router.route("/url/:shortId").get(handleRedirectUrl);

router.route("/analytics/:shortId").get(handleAnalyticsUrl);


module.exports = router;
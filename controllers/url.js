const urlModel = require("../models/url.js");
const shortId = require("shortid");

async function handleGetAllUrls(req, res) {
    if(!req.user) return res.render("home");

    const allUrls = await urlModel.find({createdBy: req.user._id});
    return res.render("home", {urls: allUrls,});
}

async function handleCreateShortId(req, res){
    const allUrls = await urlModel.find({createdBy: req.user._id});
    const shortID = shortId.generate();
    const body = req.body;
    if(!body.url) res.status(400).json({error : "URL is required"});

    await urlModel.create({
        shortId : shortID,
        redirectUrl : body.url, 
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.status(201).render("home",{id: shortID, urls: allUrls});
    // return res.status(201).json({status: "Success", id: shortID});
}

async function handleRedirectUrl(req, res){
    const shortId = req.params.shortId;
    const entry = await urlModel.findOneAndUpdate({shortId},
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );
    res.status(201).redirect(entry.redirectUrl);
}

async function handleAnalyticsUrl(req, res){
    const shortId = req.params.shortId;
    const result = await urlModel.findOne({shortId});
    return res.status(201).json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}


module.exports = {handleCreateShortId,
    handleRedirectUrl,
    handleAnalyticsUrl,
    handleGetAllUrls
};



/*-------------------------------------------------------------------*/
// async function handleCreateShortId(req, res){
//     const shortID = shortId.generate();
//     const body = req.body;
//     if(!body.url) res.status(400).json({error : "URL is required"});

//     await urlModel.create({
//         shortId : shortID,
//         redirectUrl : body.url, 
//         visitHistory: [],
//     });
//     return res.status(201).json({status: "Success", id: shortID});
// }
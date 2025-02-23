const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next){
    
    const token = req.cookies?.uid;//this means whenever a request is made, we will check cookies of the user, if it has a jwt token with the name of uid, if yes then keep the token code in userId var.

    if(!token) return res.redirect("/login");

    const user = getUser(token);// So now will use the getUser funtion, details in Service/auth.js 

    if(!user) return res.redirect("/login");

    req.user= user;//Now we got an object, which contains _id and mail, which we will store in req, so that we can get the urls of the same user, this req.user will help in url controller function handleGetAllUrls, to get the urls. 
    next();
}
async function checkAuth(req, res, next){
    
    const token = req.cookies?.uid;

    const user = getUser(token);

    req.user= user;
    next();
}

module.exports = {restrictToLoggedInUser, checkAuth};
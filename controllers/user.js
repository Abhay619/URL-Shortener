const userModel = require("../models/user");
const {v4: uuidv4} = require("uuid");
const {setUser, getUser} = require("../service/auth");

async function handleDisplaySignup(req, res){

    return res.render("signup");
}
async function handleUserSignup(req, res){
    const body = req.body;
    await userModel.create({
        name : body.name,
        email: body.email,
        password: body.password,
    });
    return res.status(201).render("login");
}

async function handleDisplayLogin(req, res){

    return res.render("login");
}
async function handleUserLogin(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({email, password});
    if(!user) res.render("login", {error: "Invalid mail or password"});

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}

module.exports = {handleUserSignup,
    handleUserLogin,
    handleDisplaySignup,
    handleDisplayLogin
};
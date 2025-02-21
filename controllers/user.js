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

    const user = await userModel.findOne({email, password});//check whether eligible to park, if yes then who is parking
    if(!user) res.render("login", {error: "Invalid mail or password"});


    // const sessionId = uuidv4();
    const token = setUser(user);// Guard/Server is making a parking ticket using setUser, which needs the info of user so we will pass it as a parameter, and now the token is made and given to user 
    res.cookie("uid", token);// this is means user has put the parking ticket in his wallet and whenever he'll take the vehicle/ whenever he make any req he will show this ticket in cookies/wallet
    return res.redirect("/");
}

module.exports = {handleUserSignup,
    handleUserLogin,
    handleDisplaySignup,
    handleDisplayLogin
};
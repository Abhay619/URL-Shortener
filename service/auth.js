// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");// basically we converted the the statefull authentication to stateless jsut by removing the register/map which helped the server as it does not has to keep the record of the user for authentication, this also helped as when we were using map, the map was getting cleaned/empty everytime the server reloaded, but the function of map is now done by JWT as, JWT provides a encryption which stores the data in a form of token, we can decrypt the token whenever we want with the functions provided by jwt,and we can decrypt this on its website also, as the decrytion technique is same all over, so it will decrypt the token to give us the user same everywhere.
const secret = ("Abhay@token");

function setUser(user){ 
    return jwt.sign(
        {
        _id: user.id,
        email: user.email,
    }, secret);// passing the payload/User data as an object to be written on ticket/token, when the token is made, and we are also passing the stamp/secretKey of the parking lot for  verification afterwards. 
    // sessionIdToUserMap.set(id, user);
}

function getUser(token){// Purpose of getUser fn is we will get the token code as parameter
    if(!token) console.log("No token");
    try {
        return jwt.verify(token, secret);// we will check if the token/parking ticket has the stamp/secret code given by the parking lot, if yes then will return the object/payload, we assigned in setUser, which will contain the _id, which will help in the getting all the urls of same user only.
    } catch (error) {
        console.log(error);
        return null;
    }
    
    // return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}
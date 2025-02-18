const mongoose = require("mongoose");

async function connectMongoDb(url){
    mongoose.connect(url).then( () => console.log("Connect to Database"));
}

module.exports = {connectMongoDb};
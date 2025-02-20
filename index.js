const express = require("express");
const path = require("path"); //this is path module used to handle directories and paths
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");//This is used when we have to work with cookies

const {restrictToLoggedInUser, checkAuth} = require("./middleware/auth");
const {connectMongoDb} = require("./connection");

const port = 9001;

connectMongoDb("mongodb://127.0.0.1:27017/url-shortener");

const app = express();

app.set("view engine", "ejs"); // this means we are using ejs as our view engine
app.set("views", path.resolve("./views"));// this means all the view files are stored in views folder

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use("/", checkAuth,staticRouter);
app.use("/url", restrictToLoggedInUser, urlRouter); //Here we are using the restrictToLoggedInUser middleware as the inline middleware
app.use("/user",userRouter);

app.listen(port, () => console.log(`Server is Live at : ${port}`));